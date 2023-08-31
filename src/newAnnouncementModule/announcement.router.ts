import announcementCrudRouter from "./announcementRoute/announcementCrud.router";
import { Router } from "express";

class announcementrouter {

  public announcementrouter = Router();
  private announcementCrudRouter = new announcementCrudRouter();

  constructor() {
    this.callRouter();
  }

  callRouter() {
    this.announcementrouter.use('/', this.announcementCrudRouter.router);


  }

}


export default announcementrouter;