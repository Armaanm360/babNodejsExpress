import AbstractRouter from '../../abstract/abstract.router';
import MemberProfileController from '../memberController/member.profile.controller';
class MemberProfileRouter extends AbstractRouter {
  private memberProfileController = new MemberProfileController();
  constructor() {
    super();
    this.callRouter();
  }

  // private callRouter() {
  //   // get profile router
  //   this.router.route('/profile').get(this.memberProfileController.getProfile);
  // }


  private callRouter() {
    //get profile router
    this.router.route('/profile').get(this.memberProfileController.getProfile);

  }
}

export default MemberProfileRouter;
