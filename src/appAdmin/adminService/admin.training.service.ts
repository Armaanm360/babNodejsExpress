import { Request } from 'express';

import { IPromiseRes } from '../../common/types/commontypes';
import {
  ICreateTrainingRes,
  IgetAllTrainingRes,
  ImemberList,
  IsingleTrainingRes,
  ItrainingMemberInput,
} from '../utils/types/admin.training.types';
import AbstractServices from '../../abstract/abstract.service';
import Lib from '../../utils/lib/lib';
import { sendEmailForTraining } from '../../templates/sendEmailForTraining';
import { callSingleParamStoredProcedure } from '../../utils/procedure/common-procedure';

class AdminTrainingService extends AbstractServices {
  constructor() {
    super();
  }

  public async createTraining(
    req: Request
  ): Promise<IPromiseRes<ICreateTrainingRes>> {
    return await this.db.transaction(async (trx) => {
      const { id } = req.admin;
      const { training_members, ...rest } = req.body;

      const training_member_json = JSON.parse(training_members);

      if (!training_member_json.length) {
        return {
          success: false,
          code: this.StatusCode.HTTP_BAD_REQUEST,
          message: this.ResMsg.HTTP_BAD_REQUEST,
        };
      }

      const files = (req.files as Express.Multer.File[]) || [];

      if (files.length) {
        files.forEach((item) => {
          rest[item.fieldname] = item.filename;
        });
      }

      // inserted training
      const trainingRes = await trx('training').insert({
        ...rest,
        created_by: id,
      });

      const trainingMemberInput: ItrainingMemberInput[] = [];

      const trainingMember: number[] = [];

      training_member_json.map((item: number) => {
        trainingMemberInput.push({
          training_id: trainingRes[0],
          member_id: item,
        });

        trainingMember.push(item);
      });

      // inserted training member
      const trainingMemberRes = await trx('training_member').insert(
        trainingMemberInput
      );

      // get member list for send email
      const memberList: ImemberList[] = await trx('user_member')
        .select('email', 'name')
        .whereIn('id', trainingMember);

      // sending email for each member
      memberList.map(async (item) => {
        await Lib.sendEmail(
          item.email,
          'New training arranged by BAB',
          sendEmailForTraining(item.name)
        );
      });

      if (trainingMemberRes.length) {
        return {
          success: true,
          code: this.StatusCode.HTTP_SUCCESSFUL,
          message: this.ResMsg.HTTP_SUCCESSFUL,
          data: {
            id: trainingRes[0],
          },
        };
      }

      return {
        success: false,
        code: this.StatusCode.HTTP_BAD_REQUEST,
        message: this.ResMsg.HTTP_BAD_REQUEST,
      };
    });
  }

  // get all training
  public async getAllTraining(
    req: Request
  ): Promise<IPromiseRes<IgetAllTrainingRes[]>> {
    const { status, from_date, to_date, limit, skip } = req.query;

    const endDate = new Date(to_date as string);
    endDate.setDate(endDate.getDate() + 1);

    const dtbs = this.db('training');

    if (limit && skip) {
      dtbs.limit(parseInt(limit as string));
      dtbs.offset(parseInt(skip as string));
    }

    const data = await dtbs
      .select('id', 'title', 'created_at', 'status')
      .where(function () {
        if (status) {
          this.andWhere({ status });
        }

        if (from_date && to_date) {
          this.andWhereBetween('created_at', [from_date, endDate]);
        }
      });

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      data,
    };
  }

  // get single training
  public async getSingleTraining(
    req: Request
  ): Promise<IPromiseRes<IsingleTrainingRes>> {
    const { id } = req.params;

    const data = await callSingleParamStoredProcedure(
      'getSingleTraining',
      parseInt(id)
    );

    if (!data.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      data: data[0],
    };
  }

  // update single training
  public async updateSingleTraining<T>(req: Request): Promise<IPromiseRes<T>> {
    const { id } = req.params;

    const files = (req.files as Express.Multer.File[]) || [];

    if (files?.length) {
      files.forEach((item) => {
        req.body[item.fieldname] = item.filename;
      });
    }

    const res = await this.db('training').update(req.body).where({ id });

    if (!res) {
      return {
        success: false,
        code: this.StatusCode.HTTP_BAD_REQUEST,
        message: this.ResMsg.HTTP_BAD_REQUEST,
      };
    }

    const response: any = {
      success: true,
      code: this.StatusCode.HTTP_SUCCESSFUL,
      message: this.ResMsg.HTTP_SUCCESSFUL,
    };

    if (files?.length) {
      files.forEach((item) => {
        response[item.fieldname] = item.filename;
      });
    }

    return response;
  }
}

export default AdminTrainingService;
