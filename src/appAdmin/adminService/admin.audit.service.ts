import AbstractServices from '../../abstract/abstract.service';
import { IGetAdminAuditProps } from '../utils/types/admin.audit.types';

class AdminAuditService extends AbstractServices {
  constructor() {
    super();
  }

  // get audit trail
  public async getAudit({
    status,
    from_date,
    to_date,
    admin_id,
    limit,
    skip,
  }: IGetAdminAuditProps) {
    const query = this.db('audit_trail as at')
      .select(
        'at.id',
        'at.details',
        'at.status',
        'at.created_at',
        'ua.id as admin_id',
        'ua.name as admin_name'
      )
      .join('user_admin as ua', 'at.admin_id', 'ua.id')
      .andWhere((qb) => {
        if (status) {
          qb.andWhere('at.status', status);
        }
        if (admin_id) {
          qb.andWhere('at.admin_id', admin_id);
        }

        if (from_date && to_date) {
          qb.andWhereBetween('at.created_at', [from_date, to_date]);
        }
      });

    if (limit && skip) {
      query.limit(limit).offset(skip);
    }

    const data = await query;

    const total = (
      await this.db('audit_trail')
        .count('id AS total')
        .andWhere((qb) => {
          if (status) {
            qb.andWhere('at.status', status);
          }
          if (admin_id) {
            qb.andWhere('at.admin_id', admin_id);
          }

          if (from_date && to_date) {
            qb.andWhereBetween('at.created_at', [from_date, to_date]);
          }
        })
    )[0].total;

    return {
      code: this.StatusCode.HTTP_OK,
      success: true,
      message: this.ResMsg.HTTP_OK,
      data,
      total,
    };
  }
}
export default AdminAuditService;
