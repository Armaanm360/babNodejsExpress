import AbstractRouter from "../../abstract/abstract.router";
import announcementCrudController from "../announcementController/announcementCrud.controller";

class announcementCrudRouter extends AbstractRouter {

  //first need a controller

  private crudController = new announcementCrudController();

  constructor() {
    super();
    this.callRouter();

  }

  public callRouter() {

    //route for fetching all data
    this.router.route('/').get(this.crudController.getAllAnouncements);

    //route for creating announcement
    this.router.route('/create').post(this.crudController.createAnouncement);




  }




}

export default announcementCrudRouter;