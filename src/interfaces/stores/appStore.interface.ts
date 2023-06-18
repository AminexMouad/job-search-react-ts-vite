import { IJobFilters } from '../filters.interface';
import { ITag } from '../job.interface';

export interface IAppState {
  isAppOnline: boolean;
  dataRetrievedFromStorage: boolean;
  filters: IJobFilters;
  jobCategories: ITag[];
}
