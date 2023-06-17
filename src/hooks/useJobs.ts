import axios, { AxiosError } from 'axios';

import { QueryKeys } from '../enums/react-query.enum';
import { useQuery } from '@tanstack/react-query';
import { IHttpResponse } from '../interfaces/httpResponse.interface';
import { useState } from 'react';

const fetchJobs = async ({ page }: { page: number }) => {
  const res = await axios.get('https://api.hrflow.ai/v1/jobs/searching', {
    params: {
      board_keys: `["887595b735d68f0bc0b0b0535f7d8f7d158a3f4e"]`,
      limit: 10,
      order_by: 'desc',
      page: page,
    },

    headers: {
      'X-API-KEY': 'askr_dbfb6f33e7d3c6b6e334b2d420f81465',
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
