import { Router } from "express";
import ServentCreateController from "./serventController/admin.user.servent.controller";


//we need to create a controller for that
class ServentRouter {
  public ServentRouter = Router();

  private serventController = new ServentCreateController();


  constructor() {
    this.callRouter();
  }

  private callRouter() {
    this.ServentRouter.route('/meow').get(this.serventController.myPremiumService);
  }





}


export default ServentRouter;