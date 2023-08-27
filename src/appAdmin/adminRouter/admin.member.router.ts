import AbstractRouter from '../../abstract/abstract.router';
import AdminMemberController from '../adminController/admin.member.controller';

class AdminMemberRouter extends AbstractRouter {
  private memberController;
  constructor() {
    super();
    this.memberController = new AdminMemberController();
    this.callRouter();
  }

  // call router
  private callRouter() {
    // get and create member route
    this.router
      .route('/')
      .get(this.memberController.getMember)
      .post(
        this.uploader.cloudUploadRaw('member_files'),
        this.memberController.createMember
      );

    // get single and update route
    this.router
      .route('/:id')
      .get(
        this.commonValidator.commonSingleParamsIdInputValidator(),
        this.memberController.getSingleMember
      )
      .patch(
        this.commonValidator.commonSingleParamsIdInputValidator(),
        this.memberController.updateMember
      );
  }
}

export default AdminMemberRouter;
