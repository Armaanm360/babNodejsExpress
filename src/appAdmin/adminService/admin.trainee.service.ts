import { Request } from 'express';
import { IPromiseRes } from '../../common/types/commontypes';
import {
  IgetAllTraineeByMemberRes,
  IgetSingleTrainee,
} from '../utils/types/admin.training.types';
import AbstractServices from '../../abstract/abstract.service';

class AdminTraineeService extends AbstractServices {
  constructor() {
    super();
  }

  // get single trainee by trainee id
  public async getSingleTraineeByTraineeId(
    req: Request
  ): Promise<IPromiseRes<IgetSingleTrainee>> {
    const { id } = req.params;

    const data = await this.db('user_trainee AS ut ')
      .select(
        'ut.id',
        'ut.name',
        'tt.designation',
        'tt.email',
        'um.name AS member_name',
        'tt.name_en',
        'tt.name_bn',
        'tt.official_address',
        'tt.residential_contact_number',
        'tt.official_contact_number',
        'tt.residential_address',
        'tt.date_of_birth',
        'tt.last_education_qualification',
        'tt.board',
        'tt.exam',
        'tt.division',
        'tt.year',
        'tt.group_subject',
        'tt.total_work_exp',
        'tt.proffessional_qualification',
        'tt.workshop_attended',
        'tt.signature'
      )
      .join('training_trainee  AS tt', 'ut.id', 'tt.user_trainee_id')
      .join('user_member AS um', 'ut.user_member_id', 'um.id')
      .andWhere('ut.id', id);

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
  // get all trainee by training member id
  public async getAllTraineeByMemberIdAndTraineeId(
    req: Request
  ): Promise<IPromiseRes<IgetAllTraineeByMemberRes[]>> {
    const { trainingMemberId, trainingId } = req.params;

    const data = await this.db('training_trainee  AS tt')
      .select('ut.id', 'ut.name', 'tt.designation', 'tt.email')
      .join('user_trainee AS ut', 'tt.user_trainee_id', 'ut.id')
      .andWhere('tt.training_member_id', trainingMemberId)
      .andWhere('tt.training_id', trainingId);

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      data,
    };
  }
}

export default AdminTraineeService;
