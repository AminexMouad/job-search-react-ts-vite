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

export const addOnlyMissingPropertiesToJobFilterObject = (
  jobFilter: object,
  job: IJob
) => {
  const filtredJob = { ...jobFilter } as IJob;

  for (const key in job) {
    if (!filtredJob[key] && key !== 'name') {
      filtredJob[key] = job[key];
    }
  }

  return filtredJob;
};

export const getOnlyRelevantJobs = (jobs: IJob[], filters: object) => {
  const filtredJobs = jobs?.filter((job) => {
    const filtredJob = addOnlyMissingPropertiesToJobFilterObject(filters, job);

    const searchedName = new RegExp(filtredJob.name, 'i');

    const hasSameCategory = job.tags.find((tag) => {
      return (
        tag.value ===
        filtredJob.tags[filtredJob?.tags?.length == 3 ? 2 : 0].value
      );
    });

    if (searchedName.test(job.name) && hasSameCategory) {
      return true;
    } else {
      return false;
    }
  });

  return filtredJobs;
};
