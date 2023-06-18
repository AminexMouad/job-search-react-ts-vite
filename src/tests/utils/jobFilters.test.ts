import jobs from '../../data/jobs.data';
import getCategoryTypeFromTags from '../../utils/getCategoryTypeFromTags';
import { sortJobs } from '../../utils/jobFilters';

describe('sortJobs', () => {
  it('should sort array by name', () => {
    const originalFirstItemName = jobs[0].name.startsWith('Software');
    const sortedData = sortJobs(jobs, 'name');

    expect(sortedData[0].name.startsWith('A')).toBeTruthy();
    expect(originalFirstItemName).toBeTruthy();
  });

  it('should sort by category', () => {
    const originalFirstItemCategoryName = getCategoryTypeFromTags(
      jobs[0].tags
    )?.value;

    const sortedData = sortJobs(jobs, 'category');

    expect(getCategoryTypeFromTags(sortedData[0].tags)?.value).not.toEqual(
      originalFirstItemCategoryName
    );
  });

  it('should sort by oldest position', () => {
    const originalFirstItemDate = new Date(jobs[0].created_at).getTime();

    const sortedData = sortJobs(jobs, 'created_at');

    expect(new Date(sortedData[0].created_at).getTime()).toBeGreaterThan(
      originalFirstItemDate
    );
  });
});
