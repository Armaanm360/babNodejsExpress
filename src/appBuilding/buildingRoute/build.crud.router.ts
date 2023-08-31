import AbstractRouter from "../../abstract/abstract.router";
import BuildingController from './../buildingController/build.crud.controller';


class CrudBuildRouter extends AbstractRouter {
  constructor() {
    super();
    this.callRouter();
  }

  private BuildingController = new BuildingController();
  public callRouter() {
    this.router.route('/').get(this.BuildingController.getBuilding);
  }

}

export default CrudBuildRouter;