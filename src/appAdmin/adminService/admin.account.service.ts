import { Request } from 'express';
import AbstractServices from '../../abstract/abstract.service';
import { callSingleParamStoredProcedure } from '../../utils/procedure/common-procedure';
import {
  ICreateAccountPayload,
  IbalanceTransfer,
} from '../utils/types/admin.account.types';

class AdminAccountService extends AbstractServices {
  constructor() {
    super();
  }

  // create account service
  public async createAccount({
    opening_balance,
    ...payload
  }: ICreateAccountPayload) {
    return this.db.transaction(async (trx) => {
      console.log({ payload });
      const data = await trx('accounts').insert(payload);
      // console.log({ opening_balance, payload, data });

      if (opening_balance) {
        await trx('ac_transactions').insert({
          ac_id: data[0],
          amount: opening_balance,
          type: 'credit',
          details: 'Opening balance credited',
        });
      }

      return {
        success: true,
        code: this.StatusCode.HTTP_SUCCESSFUL,
        data: {
          id: data[0],
        },
        message: this.ResMsg.HTTP_SUCCESSFUL,
      };
    });
  }
}

export default AdminAccountService;
