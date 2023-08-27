export interface IAdminUpdatePayload {
  email?: string;
  phone?: string;
  name?: string;
  role?: number;
  avatar?: string;
  status?: number;
}

export interface IGetAdminQuery {
  name: string | undefined;
  status: string | undefined;
  skip: string | undefined;
  limit: string | undefined;
}

export interface ICreateAdminPayload {
  name: string;
  email: string;
  password: string;
  role: number;
  phone: string;
  avatar: string;
}
