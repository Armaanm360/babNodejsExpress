import { body, query } from 'express-validator';
import ResMsg from '../../../utils/miscellaneous/responseMessage';

class AdminTrainingValidator {
  public createTrainingValidator() {
    return [
      body('title', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .exists()
        .isString()
        .notEmpty(),
      body('start_date', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .exists()
        .isDate()
        .notEmpty(),
      body('duration', ResMsg.HTTP_UNPROCESSABLE_ENTITY).exists().notEmpty(),
      body('details', ResMsg.HTTP_UNPROCESSABLE_ENTITY).exists().notEmpty(),
      body('trainer_name', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .exists()
        .notEmpty(),
      body('trainer_details', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .exists()
        .notEmpty(),
      body('trainer_remuneration', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .exists()
        .notEmpty(),
      body('training_members', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .exists()
        .notEmpty(),
    ];
  }

  public getAllTrainingValidator() {
    return [
      query('status', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .isIn(['all', 'upcoming', 'running', 'ended', 'cancelled'])
        .optional(),
      query('from_date', ResMsg.HTTP_UNPROCESSABLE_ENTITY).optional().isDate(),
      query('to_date', ResMsg.HTTP_UNPROCESSABLE_ENTITY).optional().isDate(),
    ];
  }

  // class validator
  public createClassValidator() {
    return [
      body('training_id', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .exists()
        .isInt()
        .notEmpty(),
      body('title', ResMsg.HTTP_UNPROCESSABLE_ENTITY).exists().notEmpty(),
      body('teacher', ResMsg.HTTP_UNPROCESSABLE_ENTITY).exists().notEmpty(),
      body('details', ResMsg.HTTP_UNPROCESSABLE_ENTITY).exists().notEmpty(),
      body('date', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .exists()
        .isDate()
        .notEmpty(),
      body('time', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .exists()
        .isString()
        .notEmpty(),
    ];
  }

  // materials validator
  public createMaterialsValidator() {
    return [
      body('training_id', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .exists()
        .isInt()
        .notEmpty(),
      body('title', ResMsg.HTTP_UNPROCESSABLE_ENTITY).exists().notEmpty(),
      body('note', ResMsg.HTTP_UNPROCESSABLE_ENTITY).optional(),
    ];
  }

  // certificate validator
  public createCertificateValidator() {
    return [
      body('training_id', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .exists()
        .isInt()
        .notEmpty(),
      body('training_trainee_id', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .exists()
        .isInt()
        .notEmpty(),
      body('certificate_number', ResMsg.HTTP_UNPROCESSABLE_ENTITY)
        .exists()
        .notEmpty(),
    ];
  }
}
export default AdminTrainingValidator;
