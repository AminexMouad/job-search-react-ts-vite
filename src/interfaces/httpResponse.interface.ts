import { IJob } from './job.interface';

export interface IHttpResponse {
  code: number;
  message: string;
  meta: IMeta;
  data: {
    jobs: IJob[];
  };
}

export interface IMeta {
  page: number;
  maxPage: number;
  count: number;
  total: number;
}
