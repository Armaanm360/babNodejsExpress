import { body } from 'express-validator';
import ResMsg from '../../utils/miscellaneous/responseMessage';

class AppValidator {
  public appValidator() {
    return [
      body('app_name', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .isString()
        .notEmpty()
        .isLength({ min: 3, max: 55 }),

      body('app_detail', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .isString()
        .notEmpty()
        .isLength({ min: 3, max: 255 }),
    ];
  }
}
export default AppValidator;
