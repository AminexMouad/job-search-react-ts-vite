import axios, { AxiosError } from 'axios';

import { QueryKeys } from '../enums/react-query.enum';
import { useQuery } from '@tanstack/react-query';
import { IHttpResponse } from '../interfaces/httpResponse.interface';
import { useMemo, useState } from 'react';
import { getItem } from '../utils/storage';
import { IJobFilters } from '../interfaces/filters.interface';
import { IJob, ITag } from '../interfaces/job.interface';

const fetchJobs = async ({ page }: { page: number }) => {
  const credentials: { apiKey: string; broadKey: string } =
    getItem('api_credentials');

  const res = await axios.get('https://api.hrflow.ai/v1/jobs/searching', {
    params: {
      board_keys: `["${credentials.broadKey}"]`,
      limit: 10,
      order_by: 'desc',
      page: page,
    },

    headers: {
      'X-API-KEY': credentials.apiKey,
    },
  });

  return res.data;
};

const useJobs = ({
  shouldFilterJobs = true,
  filters,
  setFilters,
}: {
  shouldFilterJobs?: boolean;
  filters?: IJobFilters;
  setFilters?: React.Dispatch<React.SetStateAction<IJobFilters | undefined>>;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

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
    const jobs = joblist?.data.jobs;

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
        } else {
          preparedFiltredJob = { ...preparedFiltredJob, [key]: value };
        }
      }

      const filtredJobs = jobs?.filter((job) => {
        const filtredJob = preparedFiltredJob as IJob;

        for (const key in job) {
          if (!filtredJob[key] && key !== 'name') {
            filtredJob[key] = job[key];
          }
        }

        const searchedName = new RegExp(filtredJob.name, 'i');
        const hasSameCategory = job.tags.find(
          (tag) => tag.value === filtredJob.tags[0].value
        );

        if (searchedName.test(job.name) && hasSameCategory) {
          return true;
        } else {
          return false;
        }
      });

      return filtredJobs;
    } else {
      return jobs;
    }
  }, [joblist?.data.jobs, filters]);

  const jobCategories: ITag[] = useMemo(() => {
    if (joblist && joblist?.data.jobs.length > 0) {
      const jobs = joblist?.data.jobs;

      const categories = jobs?.map((job) => {
        const categoryNameType = /Category/i;
        const category = job.tags.find((tag) =>
          categoryNameType.test(tag.name)
        );

        if (category !== undefined) {
          return JSON.stringify(category);
        }
      });

      const withoutDuplicated = Array.from(new Set(categories))
        .map((str) => {
          if (str) return JSON.parse(str);
        })
        .filter((cat) => cat !== undefined);

      return withoutDuplicated;
    } else {
      return [];
    }
  }, [joblist]);

  return {
    joblist,
    isLoadingJobList,
    jobListError: jobListError as AxiosError,
    refetchJob,
    currentPage,
    setCurrentPage,
    setFilters,
    filters,
    preparedJobList,
    jobCategories,
  };
};

export default useJobs;
