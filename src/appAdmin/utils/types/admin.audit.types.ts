export interface IGetAdminAuditProps {
  status: string | number | undefined;
  from_date: string | undefined;
  to_date: string | undefined;
  admin_id: string | number | undefined;
  limit: number | undefined;
  skip: number | undefined;
}
