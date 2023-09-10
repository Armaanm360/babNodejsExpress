import { body } from 'express-validator';
import ResMsg from '../../utils/miscellaneous/responseMessage';

class preUserValidator {
  public userValidator() {
    return [
      body('name', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .isString()
        .notEmpty()
        .isLength({ min: 3, max: 55 }),
      body('email', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .isString()
        .notEmpty()
        .isEmail(),
      body('password', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .isString()
        .notEmpty()
        .isLength({ min: 3, max: 255 }),
      body('deviceuniID', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .isString()
        .notEmpty()
        .isLength({ min: 3, max: 255 }),
    ];
  }
}

export default preUserValidator;
