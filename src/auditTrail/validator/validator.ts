import { body } from 'express-validator';
import ResMsg from '../../utils/miscellaneous/responseMessage';

class TrailValidator {
  public appTrailValidator() {
    return [
      body('audit_app_id', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .isNumeric()
        .notEmpty(),

      body('audit_app_device_id', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .isString()
        .notEmpty()
        .isLength({ min: 3, max: 255 }),

      body('audit_app_location', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .isString()
        .notEmpty()
        .isLength({ min: 3, max: 255 }),
      body('audit_app_email', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .isEmail()
        .notEmpty()
        .isLength({ min: 3, max: 255 }),
      body('audit_app_latitude', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .isString()
        .notEmpty()
        .isLength({ min: 3, max: 255 }),
      body('audit_app_longitude', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .isString()
        .notEmpty()
        .isLength({ min: 3, max: 255 }),
      body('audit_app_detail', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .isString()
        .notEmpty()
        .isLength({ min: 3, max: 255 }),
      body('audit_app_crashed', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .isString()
        .notEmpty()
        .isLength({ min: 3, max: 255 }),
      body('audit_app_user_type', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .isString()
        .notEmpty()
        .isLength({ min: 3, max: 255 }),
      body('audit_app_user_number', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .isString()
        .notEmpty()
        .isLength({ min: 3, max: 255 }),
    ];
  }
}
export default TrailValidator;
