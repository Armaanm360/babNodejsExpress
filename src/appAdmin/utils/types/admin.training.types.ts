export interface ICreateTrainingRes {
  id: number;
}

export interface IgetAllTrainingRes {
  id: number;
  title: string;
  created_at: string;
  status: string;
}
export interface ItrainingMemberInput {
  training_id: number;
  member_id: number;
}
export interface ImemberList {
  email: string;
  name: string;
}

export interface IsingleTrainingRes {
  id: number;
  title: string;
  start_date: string;
  duration: string;
  details: string;
  training_cover_photo: string;
  trainer_name: string;
  trainer_details: string;
  trainer_photo: string;
  trainer_remuneration: string;
  status: string;
  created_at: string;
  training_member: {
    name: string;
    status: string;
    member_id: number;
    response_date: string | null;
  }[];
}

// ============== trainee types ============== //
export interface IgetAllTraineeByMemberRes {
  id: number;
  name: string;
  designation: string;
  email: string;
}
export interface IgetSingleTrainee {
  id: number;
  name: string;
  designation: string;
  email: string;
  member_name: string;
  name_en: string;
  name_bn: string;
  official_address: string;
  residential_contact_number: string;
  official_contact_number: string;
  residential_address: string;
  date_of_birth: string;
  last_education_qualification: string;
  board: string;
  exam: string;
  division: string;
  year: string;
  group_subject: string;
  total_work_exp: string;
  proffessional_qualification: string;
  workshop_attended: string;
  signature: string;
}
