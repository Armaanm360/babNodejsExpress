import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import AuditTrailCrudService from '../service/audit.trail.crud.service';

class AuditTrailCrudController extends AbstractController {
  private crateService = new AuditTrailCrudService();
  constructor() {
    super();
  }

  public createControll = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const {
        audit_app_id,
        audit_app_device_id,
        audit_app_location,
        audit_app_email,
        audit_app_latitude,
        audit_app_longitude,
        audit_app_detail,
        audit_app_crashed,
        audit_app_user_type,
        app_audit_date,
        audit_app_user_number,
        limit,
      } = req.body;

      const { code, ...data } = await this.crateService.createAuditTrail({
        audit_app_id,
        audit_app_device_id,
        audit_app_location,
        audit_app_email,
        audit_app_latitude,
        audit_app_longitude,
        audit_app_detail,
        audit_app_crashed,
        audit_app_user_type,
        app_audit_date,
        audit_app_user_number,
        limit,
      });
      res.status(code).json(data);
    }
  );

  public getList = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const {
        audit_app_device_id,
        audit_app_location,
        audit_app_email,
        app_audit_date,
        audit_app_user_number,
        limit,
      } = req.query;
      const audit = await this.crateService.getList(
        String(audit_app_device_id),
        String(audit_app_location),
        String(audit_app_email),
        String(app_audit_date),
        String(audit_app_user_number),
        Number(limit)
      );
      res.status(201).json(audit);
    }
  );
}

export default AuditTrailCrudController;
