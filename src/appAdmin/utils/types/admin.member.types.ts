export interface IBoardCommittee {
  name: string;
  designation: string;
  signature: string;
  type: string;
}

export interface ICreateMemberPayload {
  name: string;
  email: string;
  password?: string;
  phone: string;
  address: string;
  avatar?: string;
  board_meeting_number: number;
  board_meeting_date: string;
  chairman_signature: string;
  chairman_name: string;
  created_by?: number;
  boardCommittee: string;
}

export interface IGetMemberProps {
  status: string | undefined;
}

export interface IUpdateMemberPayload {
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  address: string | undefined;
  avatar: string | undefined;
  board_meeting_number: number | undefined;
  board_meeting_date: string | undefined;
  chairman_signature: string | undefined;
}
