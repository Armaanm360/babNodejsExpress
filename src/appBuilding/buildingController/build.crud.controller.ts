import { Response, Request } from "express";
import AbstractController from "../../abstract/abstract.controller";


class BuildingController extends AbstractController {

  constructor() {
    super();
  }

  public getBuilding = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {

      res.send("Hello World");

    }
  );

}


export default BuildingController;