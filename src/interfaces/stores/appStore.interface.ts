import { IJobFilters } from '../filters.interface';

export interface IAppState {
  isAppOnline: boolean;
  dataRetrievedFromStorage: boolean;
  filterOptions: IJobFilters;
}
