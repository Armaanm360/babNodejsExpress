
import { Router } from 'express';
import CrudBuildRouter from './buildingRoute/build.crud.router';


class BuildingRouter {

  public BuildingRouter = Router();

  private CrudBuildingRouter = new CrudBuildRouter();


  constructor() {
    this.callRouter();
  }
  private callRouter() {

    this.BuildingRouter.use("/", this.CrudBuildingRouter.router);

  }
}


export default BuildingRouter;