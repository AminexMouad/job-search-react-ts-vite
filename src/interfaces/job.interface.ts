export interface IBoard {
  key: string;
  name: string;
  type: string;
  subtype: string;
  environment: string;
}

export interface ILocation {
  text: string;
  lat: number;
  lng: number;
  gmaps: null;
  fields: [];
}

export interface ISkill {
  name: string;
  value: null;
  type: null;
}

export interface ICertification {
  name: string;
  value: null;
  type: null;
}

export interface ITask {
  name: string;
  value: null;
  type: null;
}

export interface ITag {
  name: string;
  value: string;
}

export interface IRangeDate {
  name: string;
  value_min: string;
  value_max: string;
}

export interface ILanguage {
  name: string;
  value: string;
}

export interface ISection {
  name: string;
  title: string;
  description: string;
}

export interface IJob {
  id: number;
  key: string;
  reference: string;
  board_key: string;
  board: IBoard;
  name: string;
  url: string;
  picture: null;
  summary: string;
  location: ILocation;
  archive: null;
  archived_at: null;
  updated_at: string;
  created_at: string;
  sections: ISection[];
  culture: null;
  responsibilities: null;
  requirements: null;
  benefits: null;
  interviews: null;
  skills: ISkill[];
  languages: ILanguage[];
  certifications: ICertification[];
  courses: [];
  tasks: ITask[];
  tags: ITag[];
  metadatas: [];
  ranges_float: [];
  ranges_date: IRangeDate[];

  /* 
    the property below will fix the error it happens when I tried to copy all IJob properties into the filtredJob which is having the value of the object variable preparedFiltredJob
    "Element implicitly has an 'any' type because expression of type 'string' can't be  used to index type 'IJob'.
    check this link : [filtredJob[key] = job[key];](https://github.com/AminexMouad/job-search-react-ts-vite/blob/0127858fc8e1e33b8669165e36c944571fe71a7b/src/hooks/useJobs.ts#L85)
  */

  [key: string]: any;
}
