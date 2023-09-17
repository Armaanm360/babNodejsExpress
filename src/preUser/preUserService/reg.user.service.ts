import AbstractServices from '../../abstract/abstract.service';
import Lib from '../../utils/lib/lib';
import ResMsg from '../../utils/miscellaneous/responseMessage';
import { preUser } from '../utils/preUserTypes';
import CommonService from './../../common/commonService/common.service';

class preUserRegisterService extends AbstractServices {
  private commonService = new CommonService();
  constructor() {
    super();
  }

  public async createReg({
    name,
    email,
    password,
    // payment_status,
    deviceuniID,
  }: preUser) {
    const hashpass = await Lib.hashPass(password);

    //check where it is exsist or not
    const checkforemail = await this.commonService.checkUserByUniqueKey({
      table: 'users',
      field: 'email',
      value: email,
    });

    //checking condition

    if (!checkforemail) {
      const res = await this.db('users').insert({
        name,
        email,
        password: hashpass,
        // payment_status,
      });

      const userid = res[0];

      const deviceInsert = await this.db('user_device').insert({
        userid,
        deviceuniID,
      });

      if (res.length) {
        return {
          success: true,
          code: 201,
          message: 'User Added Successfull',
          data: { name, email, password },
        };
      } else {
        return {
          success: false,
          code: 401,
          message: 'data not found',
        };
      }
    } else {
      return {
        success: false,
        code: 401,
        message: 'Email Already Exsists',
      };
    }
  }
}

export default preUserRegisterService;
