import { Request } from 'express';
import { IPromiseRes } from '../../common/types/commontypes';
import AbstractServices from '../../abstract/abstract.service';
import { callSingleParamStoredProcedure } from '../../utils/procedure/common-procedure';
import Lib from '../../utils/lib/lib';
import { sendEmailForTraining } from '../../templates/sendEmailForTraining';
import { sendEmailForTrainingMaterials } from '../../templates/sendEmailForTrainingMaterials';

class AdminMaterialsService extends AbstractServices {
  constructor() {
    super();
  }

  // create Materials
  public async createMaterials(
    req: Request
  ): Promise<IPromiseRes<{ id: number; file: string }>> {
    return await this.db.transaction(async (trx) => {
      const { id } = req.admin;

      const checkTraining = await trx('training')
        .select('title')
        .where({ id: req.body.training_id });

      if (!checkTraining.length) {
        return {
          success: false,
          code: this.StatusCode.HTTP_NOT_FOUND,
          message: this.ResMsg.HTTP_NOT_FOUND,
        };
      }

      const files = (req.files as Express.Multer.File[]) || [];

      if (files?.length) {
        req.body[files[0].fieldname] = files[0].filename;
      }

      const res = await trx('training_materials').insert({
        ...req.body,
        created_by: id,
      });

      if (!res.length) {
        return {
          success: false,
          code: this.StatusCode.HTTP_INTERNAL_SERVER_ERROR,
          message: this.ResMsg.HTTP_INTERNAL_SERVER_ERROR,
        };
      }

      // get all training trainee under this training
      const getAllApprovedTrainee = await trx('training_trainee AS tt')
        .select('ut.email', 'ut.name')
        .join('user_trainee AS ut', 'tt.user_trainee_id', 'ut.id')
        .andWhere('ut.status', '1')
        .andWhere('tt.training_id', req.body.training_id);

      if (getAllApprovedTrainee.length) {
        getAllApprovedTrainee.forEach(async (item) => {
          await Lib.sendEmail(
            item.email,
            'Materials added in training',
            sendEmailForTrainingMaterials(item.name)
          );
        });
      }

      return {
        success: true,
        code: this.StatusCode.HTTP_SUCCESSFUL,
        message: this.ResMsg.HTTP_SUCCESSFUL,
        data: { id: res[0], file: files[0]?.filename },
      };
    });
  }

  // get single Materials
  public async getSingleMaterials(req: Request): Promise<IPromiseRes<any>> {
    const { id } = req.params;

    const data = await callSingleParamStoredProcedure(
      'getSingleClassByClassId',
      parseInt(id)
    );

    console.log(data);

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
      data,
    };
  }
}

export default AdminMaterialsService;
