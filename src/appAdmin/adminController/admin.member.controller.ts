import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import AdminMemberService from '../adminService/admin.member.service';
import {
  IBoardCommittee,
  ICreateMemberPayload,
} from '../utils/types/admin.member.types';

class AdminMemberController extends AbstractController {
  private adminMemberService = new AdminMemberService();
  constructor() {
    super();
  }

  // create member controller
  public createMember = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { id } = req.admin;
      const {
        name,
        email,
        phone,
        address,
        board_meeting_date,
        board_meeting_number,
        chairman_name,
        boardCommittee,
      } = req.body as ICreateMemberPayload;

      // console.log(req.body);

      const memberBody: any = {
        name,
        email,
        phone,
        address,
        board_meeting_date,
        board_meeting_number,
        chairman_name,
        created_by: id,
      };

      if (!boardCommittee) {
        res.status(this.StatusCode.HTTP_UNPROCESSABLE_ENTITY).json({
          success: false,
          message: 'You must provide board committee',
        });

        return;
      }

      let board = JSON.parse(boardCommittee) as IBoardCommittee[];

      const files = (req.files as Express.Multer.File[]) || [];

      // console.log({ files });

      files.forEach((item) => {
        if (
          item.fieldname === 'avatar' ||
          item.fieldname === 'chairman_signature'
        ) {
          memberBody[item.fieldname] = item.filename;
        } else {
          board = board.map((com) => {
            if (com.name === item.fieldname) {
              return { ...com, signature: item.filename };
            } else {
              return com;
            }
          });
        }
      });

      // console.log({ board });

      const { code, ...data } = await this.adminMemberService.createMember({
        ...memberBody,
        boardCommittee: board,
      });

      if (data.success) {
        res.status(code).json(data);
        // await this.createAudit(
        //   id,
        //   'created member. Member id' + data.data?.id,
        //   code
        // );
      } else {
        this.error(data.message, code);
      }
    }
  );

  // get member controller
  public getMember = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { status } = req.query;
      const { code, ...data } = await this.adminMemberService.getMember({
        status: status as string,
      });

      res.status(code).json(data);
    }
  );

  // get single member controller
  public getSingleMember = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const { code, ...data } = await this.adminMemberService.getSingleMember(
        id
      );

      res.status(code).json(data);
    }
  );

  // update member controller
  public updateMember = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const { id: admin_id } = req.admin;
      const body = req.body;
      const files = (req.files as Express.Multer.File[]) || [];

      if (files.length) {
        files.forEach((item) => {
          body[item.fieldname] = item.filename;
        });
      }
      const { code, ...data } = await this.adminMemberService.updateMember(
        id,
        body
      );

      await this.createAudit(admin_id, 'updated member. Member id' + id, code);

      if (data.success) {
        res.status(code).json(data);
      } else {
        this.error(data.message, code);
      }
    }
  );
}

export default AdminMemberController;
