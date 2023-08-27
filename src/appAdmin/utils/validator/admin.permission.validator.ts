import { body } from 'express-validator';
import ResMsg from '../../../utils/miscellaneous/responseMessage';
class AdminPermissionValidator {
  // create permission group validator
  public createPermissionGroup() {
    return [body('name', ResMsg.HTTP_UNPROCESSABLE_ENTITY).exists().isString()];
  }

  // create permission validator
  public createPermission() {
    return [
      body('group_id', ResMsg.HTTP_UNPROCESSABLE_ENTITY).exists().isInt(),
      body('name', ResMsg.HTTP_UNPROCESSABLE_ENTITY).exists().isString(),
    ];
  }
}
export default AdminPermissionValidator;
