type jobFilterSortByType = 'created_at' | 'name' | 'category';

export interface IJobFilters {
  name?: string | undefined;
  category?: string | undefined;
  sortBy?: jobFilterSortByType;
}
