import jobItemData from '../../data/jobItem.data';
import jobs from '../../data/jobs.data';
import getCategoryTypeFromTags from '../../utils/getCategoryTypeFromTags';
import {
  addOnlyMissingPropertiesToJobFilterObject,
  getOnlyRelevantJobs,
  sortJobs,
} from '../../utils/jobFilters';

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

describe('addOnlyMissingPropertiesToJobFilterObject', () => {
  const jobFilter = {
    tags: [
      {
        name: 'category',
        value: 'rh',
      },
    ],
  };
  it('should add all the missing properties from job object', () => {
    const preparedJobFilter = addOnlyMissingPropertiesToJobFilterObject(
      jobFilter,
      jobItemData
    );

    expect(preparedJobFilter.location).toEqual(jobItemData.location);
  });

  it("shouldn't add property name to job filter object", () => {
    const preparedJobFilter = addOnlyMissingPropertiesToJobFilterObject(
      jobFilter,
      jobItemData
    );

    expect(preparedJobFilter.name).not.toBeDefined();
  });
});

describe('getOnlyRelevantJobs', () => {
  it('should return relevant jobs with name that contains senior', () => {
    const jobFilter = {
      name: 'senior',
    };
    const filtredJobs = getOnlyRelevantJobs(jobs, jobFilter);

    expect(filtredJobs.length).toBe(2);
  });

  it('should return relevant jobs with a specific category', () => {
    const jobFilter = {
      name: 'senior',
      tags: [
        {
          name: 'category',
          value: 'Software engineering',
        },
      ],
    };
    const preparedJobFilter = addOnlyMissingPropertiesToJobFilterObject(
      jobFilter,
      jobItemData
    );

    const filtredJobs = getOnlyRelevantJobs(jobs, preparedJobFilter);

    expect(filtredJobs.length).toBe(1);
  });

  it('should return empty array if there are no jobs', () => {
    const jobFilter = {
      name: 'senior',
      tags: [
        {
          name: 'category',
          value: 'Software ',
        },
      ],
    };
    const preparedJobFilter = addOnlyMissingPropertiesToJobFilterObject(
      jobFilter,
      jobItemData
    );

    const filtredJobs = getOnlyRelevantJobs(jobs, preparedJobFilter);

    expect(filtredJobs.length).toBe(0);
  });
});
