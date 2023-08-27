import { Request, Response } from 'express';
import AbstractController from '../../abstract/abstract.controller';
import AdminAccountService from '../adminService/admin.account.service';

class AdminAccountController extends AbstractController {
  private accountService = new AdminAccountService();
  constructor() {
    super();
  }
  // create account
  public createAccount = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { opening_balance, branch, account_number, details, name } =
        req.body;
      const { code, ...data } = await this.accountService.createAccount({
        opening_balance,
        branch,
        account_number,
        details,
        name,
      });

      res.status(code).json(data);
    }
  );

  // get accounts
  public getAccounts = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { name } = req.query as { name: string };
      const { code, ...data } = await this.accountService.getAccounts(name);

      res.status(code).json(data);
    }
  );

  // get single account
  public getSingleAccount = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const { code, ...data } = await this.accountService.getSingleAccount(id);

      res.status(code).json(data);
    }
  );

  // account transfer
  public accountTransfer = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.accountService.accountTransfer(req);

      res.status(code).json(data);
    }
  );

  // get all balance transfer history
  public getAllBalanceTransferList = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...data } =
        await this.accountService.getAllBalanceTransferList(req);

      res.status(code).json(data);
    }
  );

  // get all account transaction
  public getAllTransactionList = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.accountService.getAllTransactionList(
        req
      );

      res.status(code).json(data);
    }
  );
}
export default AdminAccountController;
