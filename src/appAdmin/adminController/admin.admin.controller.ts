import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import AdminAdminService from '../adminService/admin.admin.service';
import { IGetAdminQuery } from '../utils/types/admin.admin.types';
import Lib from '../../utils/lib/lib';
import CommonService from '../../common/commonService/common.service';

class AdminAdminController extends AbstractController {
  private adminAdminServices = new AdminAdminService();
  private commonService = new CommonService();
  constructor() {
    super();
  }

  // get profile controller
  public getProfile = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { id } = req.admin;
      const { code, ...data } = await this.adminAdminServices.getProfile(id);
      res.status(code).json(data);
    }
  );

  // create admin controller
  public createAdmin = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { name, email, password, role, phone } = req.body;
      const files = (req.files as Express.Multer.File[]) || [];

      if (!files.length) {
        res.status(this.StatusCode.HTTP_UNPROCESSABLE_ENTITY).json({
          success: false,
          message: `You must provide avatar to create admin`,
        });

        return;
      }

      const checkAdmin = await this.commonService.checkUserByUniqueKey({
        table: 'user_admin',
        field: 'email',
        value: email,
      });

      if (checkAdmin) {
        res.status(this.StatusCode.HTTP_CONFLICT).json({
          success: false,
          message: 'Email already exist.',
        });
        return;
      }

      const hashedPass = await Lib.hashPass(password);

      const { code, ...data } = await this.adminAdminServices.createAdmin({
        name,
        email,
        password: hashedPass,
        role,
        phone,
        avatar: files[0].filename,
      });

      if (data.success) {
        res.status(code).json(data);
      } else {
        this.error(data.message, code);
      }
    }
  );

  // get admin controller
  public getAdmin = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { status, skip, limit, name } =
        req.query as unknown as IGetAdminQuery;
      const { code, ...data } = await this.adminAdminServices.getAdmin(
        name as string,
        parseInt(status || ''),
        parseInt(skip || ''),
        parseInt(limit || '')
      );

      res.status(code).json(data);
    }
  );

  // get single admin controller
  public getSingleAdmin = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const { code, ...data } = await this.adminAdminServices.getAnAdmin(id);
      res.status(code).json(data);
    }
  );

  // update an admin controller
  public updateAdmin = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const { _id, _password, _created_at, ...restBody } = req.body;

      const files = (req.files as Express.Multer.File[]) || [];

      if (files.length) {
        restBody.avatar = files[0].filename;
      }

      const { code, ...data } = await this.adminAdminServices.updateAdmin(
        id,
        restBody
      );

      if (data.success) {
        res.status(code).json(data);
      } else {
        this.error(data.message, code);
      }
    }
  );
}

export default AdminAdminController;
