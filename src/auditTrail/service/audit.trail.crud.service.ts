import AbstractServices from '../../abstract/abstract.service';
import { CreatingAuditTrailInterface } from '../utils/create.app';

class AuditTrailCrudService extends AbstractServices {
  constructor() {
    super();
  }

  public async createAuditTrail({
    audit_app_id,
    audit_app_device_id,
    audit_app_location,
    audit_app_email,
    audit_app_latitude,
    audit_app_longitude,
    audit_app_detail,
    audit_app_crashed,
    audit_app_user_type,
    audit_app_user_number,
    app_audit_date,
  }: CreatingAuditTrailInterface) {
    const res = await this.db('audit').insert({
      audit_app_id,
      audit_app_device_id,
      audit_app_location,
      audit_app_email,
      audit_app_latitude,
      audit_app_longitude,
      audit_app_detail,
      audit_app_crashed,
      audit_app_user_type,
      audit_app_user_number,
      app_audit_date,
    });
    if (res.length) {
      return {
        success: true,
        code: 201,
        message: 'Transaction added successfully',
        data: {
          audit_app_id,
          audit_app_device_id,
          audit_app_location,
          audit_app_email,
          audit_app_latitude,
          audit_app_longitude,
          audit_app_detail,
          audit_app_crashed,
          audit_app_user_type,
          audit_app_user_number,
          app_audit_date,
        },
      };
    } else {
      return {
        success: false,
        code: 401,
        message: 'data not found',
      };
    }
  }

  public async getList(
    audit_app_device_id: string,
    audit_app_location: string,
    audit_app_email: string,
    audit_app_user_number: string,
    app_audit_date: string,
    limit: number
  ) {
    // const audit = await this.db('audit')
    //   .select(
    //     'audit.audit_id',
    //     'audit.audit_app_id',
    //     'audit.audit_app_device_id',
    //     'audit.audit_app_location',
    //     'audit.audit_app_email',
    //     'audit.audit_app_latitude',
    //     'audit.audit_app_longitude',
    //     'audit.audit_app_detail',
    //     'audit.audit_app_crashed',
    //     'audit.audit_app_user_type',
    //     'audit.audit_app_user_number',
    //     'audit.app_audit_date',
    //     'audit.created_at',
    //     'apps.app_id',
    //     'apps.app_name',
    //     'apps.app_detail'
    //   )
    //   .join('apps', 'audit.audit_app_id', 'apps.app_id')
    //   .andWhere((qb) => {
    //     if (audit_app_device_id) {
    //       qb.andWhere('audit_app_device_id', audit_app_device_id);
    //     }
    //   });
    const audit = await this.db('audit')
      .select(
        'audit.audit_id',
        'audit.audit_app_id',
        'audit.audit_app_device_id',
        'audit.audit_app_location',
        'audit.audit_app_email',
        'audit.audit_app_latitude',
        'audit.audit_app_longitude',
        'audit.audit_app_detail',
        'audit.audit_app_crashed',
        'audit.audit_app_user_type',
        'audit.audit_app_user_number',
        'audit.app_audit_date',
        'audit.created_at',
        'apps.app_id',
        'apps.app_name',
        'apps.app_detail'
      )
      .join('apps', 'audit.audit_app_id', 'apps.app_id')
      .limit(limit)
      .where((qb) => {
        if (audit_app_device_id) {
          qb.andWhere('audit_app_device_id', audit_app_device_id);
        }
        if () {
          
        }
      });
    const totalCount = await this.db('audit').count();

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      data: audit,
      total: totalCount[0]['count(*)'],
    };
  }
}

export default AuditTrailCrudService;
