import { ITag } from '../interfaces/job.interface';

export default function getCategoryTypeFromTags(tags: ITag[]) {
  const categoryNameType = /Category/i;
  const category = tags.find((tag) => categoryNameType.test(tag.name));
  return category;
}
