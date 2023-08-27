import { Router } from "express";
import studentCreateRouter from "./studentRoute/student.create.router";


class StudentRouter {

  public StudentRouter = Router();
  private studentCreateRouter = new studentCreateRouter;  //controller


  constructor() {
    this.callRouter();
  }

  private callRouter() {

    this.StudentRouter.use("/", this.studentCreateRouter.router);

  }



}


export default StudentRouter;