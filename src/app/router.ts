import { Router } from "express";
import AdminRouter from "../appAdmin/admin.router";
import CommonRouter from "../common/commonRouter/common.router";
import AuthRouter from "../auth/auth.router";
import TraineeRouter from "../appTrainee/traineeRouter/trainee.router";
import AuthChecker from "../common/middlewares/authChecker/authChecker";
import MemberRouter from "../appMember/member.router";
import StudentRouter from "../appStudent/student.router";

class RootRouter {
  public v1Router = Router();
  private authChecker = new AuthChecker();
  private adminRouter = new AdminRouter();
  private commonRouter = new CommonRouter();
  private authRouter = new AuthRouter();
  private memberRouter = new MemberRouter();
  private traineeRouter = new TraineeRouter();
  private studentRouter = new StudentRouter();

  constructor() {
    this.callV1Router();
  }

  private callV1Router() {
    // auth router for member, admin, trainee
    this.v1Router.use("/auth", this.authRouter.AuthRouter);

    // common router for all
    this.v1Router.use("/common", this.commonRouter.router);

    // admin router all are protected
    this.v1Router.use(
      "/admin",
      this.authChecker.adminAuthChecker,
      this.adminRouter.AdminRouter
    );

    // member router all are protected
    this.v1Router.use(
      "/member",
      this.authChecker.memberAuthChecker,
      this.memberRouter.MemberRouter
    );

    // trainee router all are protected
    this.v1Router.use(
      "/trainee",
      this.authChecker.traineeAuthChecker,
      this.traineeRouter.TraineeRouter
    );


    this.v1Router.use(
      "/student", this.studentRouter.StudentRouter
    );

    // external routers some public and some protected
    // this.v1Router.use('/external');
  }
}

export default RootRouter;
