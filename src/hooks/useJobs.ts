import axios, { AxiosError } from 'axios';

import { QueryKeys } from '../enums/react-query.enum';
import { useQuery } from '@tanstack/react-query';
import { IHttpResponse } from '../interfaces/httpResponse.interface';
import { useState } from 'react';
import { getItem } from '../utils/storage';

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

const useJobs = () => {
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
      onSuccess(data) {
        setCurrentPage(data.meta.page);
      },
    }
  );

  return {
    joblist,
    isLoadingJobList,
    jobListError: jobListError as AxiosError,
    refetchJob,
    currentPage,
    setCurrentPage,
  };
};

export default useJobs;
