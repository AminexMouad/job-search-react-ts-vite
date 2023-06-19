import axios, { AxiosError } from 'axios';

import { QueryKeys } from '../enums/react-query.enum';
import { useQuery } from '@tanstack/react-query';
import { IHttpResponse } from '../interfaces/httpResponse.interface';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getItem } from '../utils/storage';
import { IJob } from '../interfaces/job.interface';
import getCategoryTypeFromTags from '../utils/getCategoryTypeFromTags';
import { getOnlyRelevantJobs, sortJobs } from '../utils/jobFilters';
import { useAppDispatch, useAppState } from './useApp';
import { IAppState } from '../interfaces/stores/appStore.interface';

export const fetchJobs = async ({
  page,
  apiKey,
  broadKey,
}: {
  page?: number;
  apiKey?: string;
  broadKey?: string;
}) => {
  const credentials: { apiKey: string; broadKey: string } =
    getItem('api_credentials');

  const preparedApiKey = apiKey || credentials.apiKey;

  const preparedBroadKey = broadKey || credentials.broadKey;

  const res = await axios.get('https://api.hrflow.ai/v1/jobs/searching', {
    params: {
      board_keys: `["${preparedBroadKey}"]`,
      limit: 10,
      order_by: 'asc',
      page: page || 1,
    },

    headers: {
      'X-API-KEY': preparedApiKey,
    },
  });

  return res.data;
};

const useJobs = ({
  shouldFilterJobs = true,
}: {
  shouldFilterJobs?: boolean;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { filters } = useAppState();
  const appDispatch = useAppDispatch();

  const {
    data: joblist,
    isLoading: isLoadingJobList,
    error: jobListError,
    refetch: refetchJob,
  } = useQuery<IHttpResponse>(
    [QueryKeys.JOBS, currentPage],
    () => fetchJobs({ page: currentPage }),
    {
      enabled: shouldFilterJobs,
      onSuccess(data) {
        setCurrentPage(data.meta.page);
      },
    }
  );

  const preparedJobList = useMemo(() => {
    const jobs = joblist?.data.jobs || [];

    if (filters) {
      let preparedFiltredJob: object = {};

      for (const [key, value] of Object.entries(filters)) {
        if (key === 'category' && filters.category) {
          preparedFiltredJob = {
            ...preparedFiltredJob,
            tags: [
              {
                name: key,
                value,
              },
            ],
          };
        } else if (key !== 'sortBy') {
          preparedFiltredJob = { ...preparedFiltredJob, [key]: value };
        }
      }

      let filtredJobs: IJob[];
      if (filters.category || filters.name) {
        filtredJobs = getOnlyRelevantJobs(jobs, preparedFiltredJob);

        return filtredJobs;
      } else {
        filtredJobs = jobs;
      }

      if (filters.sortBy) {
        if (!filtredJobs) {
          return sortJobs(filtredJobs, filters.sortBy);
        } else {
          sortJobs(jobs, filters.sortBy);
        }
      }
      return filtredJobs;
    } else {
      return jobs;
    }
  }, [joblist?.data.jobs, filters]);

  const getJobCategories = useCallback(() => {
    if (joblist && joblist?.data.jobs.length > 0) {
      const jobs = joblist?.data.jobs;

      const categories = jobs?.map((job) => {
        const category = getCategoryTypeFromTags(job.tags);

        if (category !== undefined) {
          return JSON.stringify(category);
        }
      });

      const withoutDuplicated = Array.from(new Set(categories))
        .map((str) => {
          if (str) return JSON.parse(str);
        })
        .filter((cat) => cat !== undefined);

      appDispatch({
        type: 'SET_STATE',
        payload: {
          jobCategories: withoutDuplicated,
        } as IAppState,
      });
    }
  }, [appDispatch, joblist]);

  useEffect(() => {
    getJobCategories();
  }, [getJobCategories]);

  return {
    joblist,
    isLoadingJobList,
    jobListError: jobListError as AxiosError,
    refetchJob,
    currentPage,
    setCurrentPage,
    preparedJobList,
  };
};

export default useJobs;
