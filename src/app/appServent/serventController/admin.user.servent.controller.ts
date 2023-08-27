
import { Request, Response } from "express";
import AbstractController from "../../../abstract/abstract.controller";


class ServentCreateController extends AbstractController {

  //make a new name = new 

  public myPremiumService = async (req: Request, res: Response) => {


    res.send("This is a new service from ther data end");


  }

}

export default ServentCreateController;