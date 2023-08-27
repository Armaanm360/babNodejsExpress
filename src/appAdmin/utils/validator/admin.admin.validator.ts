import { body } from 'express-validator';
import ResMsg from '../../../utils/miscellaneous/responseMessage';

class AdminAdminValidator {
  // create admin validator
  public createAdminValidator() {
    return [
      body('name', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .exists()
        .isString()
        .notEmpty(),
      body('email', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .exists()
        .isEmail()
        .notEmpty(),
      body('password', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .exists()
        .isString()
        .isLength({ min: 8 })
        .withMessage('Provide minimun 8 length password'),
      body('role', ResMsg.HTTP_UNPROCESSABLE_ENTITY).exists().isInt(),
      body('phone', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .exists()
        .isString()
        .notEmpty(),
    ];
  }

  // update admin validator
  public updateAdminValidator() {
    return [
      body('name', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .exists()
        .isString()
        .notEmpty()
        .optional(),
      body('email', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .exists()
        .isEmail()
        .notEmpty()
        .optional(),
      body('role', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .exists()
        .isInt()
        .optional(),
      body('phone', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .exists()
        .isString()
        .notEmpty()
        .optional(),
    ];
  }
}
export default AdminAdminValidator;
