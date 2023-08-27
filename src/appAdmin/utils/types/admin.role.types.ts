export interface IRolePermissions {
  permission_id: number;
  role_id?: number;
  read?: 0 | 1;
  create?: 0 | 1;
  update?: 0 | 1;
  delete?: 0 | 1;
}

export interface ICreateRoleProps {
  name: string;
  created_by: number;
  permissions: IRolePermissions[];
}

export interface IUpdateRoleProps {
  id: number | string;
  remove_permissions: number[];
  add_permissions: number[];
}
