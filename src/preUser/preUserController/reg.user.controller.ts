import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import preUserRegisterService from './../preUserService/reg.user.service';
import { ILogin } from '../../common/types/commontypes';
import LoginUserService from '../preUserService/pre.user.login.service';

class preUserController extends AbstractController {
  private preUserRegisterService = new preUserRegisterService();
  private loginService = new LoginUserService();
  constructor() {
    super();
  }

  public createUserReg = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { name, email, password, payment_status, deviceuniID } = req.body;

      const { code, ...data } = await this.preUserRegisterService.createReg({
        name,
        email,
        password,
        payment_status,
        deviceuniID,
      });

      res.status(code).json(data);
    }
  );

  public createUserLogin = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { email, password, deviceId } = req.body as ILogin;
      const { code, ...data } = await this.loginService.loginService({
        email,
        password,
        deviceId,
      });
      res.status(code).json(data);
    }
  );
}

export default preUserController;
