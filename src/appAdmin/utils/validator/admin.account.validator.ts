import { body } from 'express-validator';

class AdminAccountValidator {
  // create account validator
  public createAccount() {
    return [
      body('name', 'Provide valid account name').isString().not().isEmpty(),
      body('details', 'Provide valid account details')
        .isString()
        .not()
        .isEmpty(),
      body('branch', 'Provide valid branch name').isString().optional(),
      body('account_number', 'Provide valid account number').isInt().optional(),
      body('opening_balance', 'Provide valid opening balance')
        .isNumeric()
        .optional(),
    ];
  }

  //  account transfer validator
  public accountTransfer() {
    return [
      body('from_ac', 'Provide valid from account id').isInt().not().isEmpty(),
      body('to_ac', 'Provide valid to account id').isInt().not().isEmpty(),
      body('amount', 'Provide amount').exists().notEmpty(),
      body('details', 'Provide valid  details').isString().not().isEmpty(),
      body('remarks', 'Provide valid remarks').isString().not().isEmpty(),
    ];
  }
}
export default AdminAccountValidator;
