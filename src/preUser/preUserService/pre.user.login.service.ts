import { Request, Response } from 'express';
import AbstractServices from '../../abstract/abstract.service';
import { ILogin } from '../../common/types/commontypes';
import Lib from '../../utils/lib/lib';

class LoginUserService extends AbstractServices {
  constructor() {
    super();
  }

  public async loginService({ email, password, deviceId }: ILogin) {
    const checkuser = await this.db('users').select('*').where({ email });

    const name = checkuser[0].name;
    const payment_status = checkuser[0].payment_status;

    if (!checkuser.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_BAD_REQUEST,
        message: this.ResMsg.WRONG_CREDENTIALS,
      };
    }

    const { userid } = checkuser[0];

    const checkDeviceId = await this.db('user_device AS ud')
      .select('device_id')
      .join('users AS u', 'ud.userid', 'u.userid')
      .andWhere({ email })
      .andWhere({ deviceuniId: deviceId });

    if (!checkDeviceId.length) {
      await this.db('user_device').insert({
        userid,
        deviceuniId: deviceId,
      });

      const deactiveRes = await this.db('user_device')
        .update({ device_status: 0 })
        .andWhere({ userid })
        .andWhereNot({ deviceuniID: deviceId });
    } else {
      const { device_id } = checkDeviceId[0];
      await this.db('user_device')
        .update({ device_status: 1 })
        .where({ device_id });

      await this.db('user_device')
        .update({ device_status: 0 })
        .andWhere({ userid })
        .andWhereNot({ deviceuniID: deviceId });
    }

    const { password: hashPass, ...rest } = checkuser[0];
    const checkPass = await Lib.compare(password, hashPass);
    if (!checkPass) {
      return {
        success: false,
        code: this.StatusCode.HTTP_BAD_REQUEST,
        message: this.ResMsg.WRONG_CREDENTIALS,
      };
    }

    // cont token = Lib.createToken();

    return {
      success: true,
      code: 201,
      message: 'Logged In Successfully',
      data: { userid,name,email,payment_status },
    };
  }
}

export default LoginUserService;
