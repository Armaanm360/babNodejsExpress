import AbstractServices from '../../abstract/abstract.service';
import { newMemberAccount } from '../../templates/newMemberAccount';
import Lib from '../../utils/lib/lib';
import { callSingleParamStoredProcedure } from '../../utils/procedure/common-procedure';
import {
  IBoardCommittee,
  IGetMemberProps,
  IUpdateMemberPayload,
} from '../utils/types/admin.member.types';

class AdminMemberService extends AbstractServices {
  constructor() {
    super();
  }

  // create member service
  public async createMember(payload: any) {
    return this.db.transaction(async (trx) => {
      console.log({ payload });
      const { boardCommittee, ...body } = payload;

      const check = await trx('user_member')
        .select('*')
        .where('email', payload.email);

      if (check.length) {
        return {
          success: false,
          code: this.StatusCode.HTTP_CONFLICT,
          message: 'Email already exist',
        };
      }

      const password = Lib.otpGenNumberAndAlphabet(8);
      const hashPass = await Lib.hashPass(password);

      body.password = hashPass;

      const member = await trx('user_member').insert(body);

      const committee = boardCommittee.map((item: IBoardCommittee) => {
        return {
          ...item,
          user_member_id: member[0],
        };
      });
      await trx('member_committee_members').insert(committee);

      const template = newMemberAccount(body.email, password);

      await Lib.sendEmail(
        body.email,
        'Your BAB Membership account is Created',
        template
      );

      return {
        success: true,
        code: this.StatusCode.HTTP_SUCCESSFUL,
        message: this.ResMsg.HTTP_SUCCESSFUL,
        data: {
          id: member[0],
          avatar: payload.avatar,
          chairman_signature: payload.chairman_signature,
        },
      };
    });
  }

  // get member service
  public async getMember(props: IGetMemberProps) {
    return this.db.transaction(async (trx) => {
      const members = await trx('user_member')
        .select('id', 'name', 'email', 'avatar', 'status')
        .andWhere((qb) => {
          if (props.status) {
            qb.andWhere({ status: props.status });
          }
        })
        .orderBy('created_at', 'desc');

      return {
        success: true,
        code: this.StatusCode.HTTP_OK,
        data: members,
      };
    });
  }

  // get single member
  public async getSingleMember(id: string | number) {
    const member = await callSingleParamStoredProcedure(
      'getSingleMember',
      id as number
    );

    if (!member.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      message: this.ResMsg.HTTP_OK,
      data: member[0],
    };
  }

  // update member service
  public async updateMember(
    id: string | number,
    payload: IUpdateMemberPayload
  ) {
    if (!Object.keys(payload).length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_BAD_REQUEST,
        message: this.ResMsg.HTTP_BAD_REQUEST,
      };
    }

    const check = await this.db('user_member')
      .select('avatar', 'chairman_signature')
      .where({ id });

    if (!check.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }

    const data = await this.db('user_member').update(payload).where({ id });

    if (data) {
      const deleteFiles: string[] = [];
      if (check[0].avatar && payload.avatar) {
        deleteFiles.push(check[0].avatar);
      }
      if (check[0].chairman_signature && payload.chairman_signature) {
        deleteFiles.push(check[0].chairman_signature);
      }

      if (deleteFiles.length) {
        await this.manageFile.deleteFromCloud(deleteFiles);
      }

      return {
        success: true,
        code: this.StatusCode.HTTP_ACCEPTED,
        message: this.ResMsg.HTTP_ACCEPTED,
      };
    } else {
      return {
        success: false,
        code: this.StatusCode.HTTP_INTERNAL_SERVER_ERROR,
        message: this.ResMsg.HTTP_INTERNAL_SERVER_ERROR,
      };
    }
  }
}
export default AdminMemberService;
