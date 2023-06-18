import getCategoryTypeFromTags from '../../utils/getCategoryTypeFromTags';

const tags = [
  {
    name: 'company',
    value: 'HrFlow.ai',
  },
  {
    name: 'type',
    value: 'Full time',
  },
  {
    name: 'category',
    value: 'Software engineering',
  },
];

describe('getCategoryTypeFromTags', () => {
  it('should return category object from tags array', () => {
    const category = getCategoryTypeFromTags(tags);

    expect(category).toBeDefined();
  });

  it('should return undefined if category is not in tags', () => {
    const tagsWithoutCategory = tags.filter((tag) => tag.name !== 'category');
    const category = getCategoryTypeFromTags(tagsWithoutCategory);

    expect(category).not.toBeDefined();
  });
});
