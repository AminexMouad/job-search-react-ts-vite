import { jobFilterSortByType } from '../interfaces/filters.interface';
import { IJob } from '../interfaces/job.interface';
import getCategoryTypeFromTags from './getCategoryTypeFromTags';

export const sortJobs = (jobs: IJob[], sortBy: jobFilterSortByType) => {
  return jobs?.sort((jobA, jobB) => {
    if (sortBy === 'name') {
      return jobA.name.localeCompare(jobB.name);
    } else if (sortBy === 'created_at') {
      const jobADate = new Date(jobA.created_at).getTime();
      const jobBDate = new Date(jobB.created_at).getTime();

      return jobBDate - jobADate;
    } else {
      const jobACategoryName = getCategoryTypeFromTags(jobA.tags)?.value;
      const jobBCategoryName = getCategoryTypeFromTags(jobB.tags)?.value;

      return jobACategoryName?.localeCompare(jobBCategoryName || 'z');
    }
  });
};
