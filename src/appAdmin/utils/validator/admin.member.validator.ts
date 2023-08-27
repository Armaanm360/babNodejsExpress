import { body } from 'express-validator';

class AdminMemberValidator {
  // create member validator
  public createMemberValidator() {
    return [body()];
  }
}
export default AdminMemberValidator;
