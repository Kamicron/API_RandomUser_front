export interface Gender {
  id_gender: number;
  label: string;
  display_name: string;
}

export interface Ethnicity {
  id_ethnicity: number;
  label: string;
  display_name: string;
}

export interface Photo {
  id_photo: number;
  src: string;
  alt: string;
}

export interface Work {
  id_work: number;
  label: string;
  logo_work: string;
  displayName: string;
}

export interface PersonalInfo {
  firstname: string;
  lastname: string;
  gender: Gender;
  ethnicity: Ethnicity;
}

export interface PnjInfo {
  personalInfo: PersonalInfo;
  photo: Photo;
  work: Work;
}
