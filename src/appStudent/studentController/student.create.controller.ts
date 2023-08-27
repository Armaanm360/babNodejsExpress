import AbstractController from "../../abstract/abstract.controller";
import { Request, Response } from 'express';
import createStudentService from './../studentService/student.create.service';



class StudentCreateController extends AbstractController {
  private createStudentService = new createStudentService();

  public getStudent = this.asyncWrapper.wrap(async (req: Request, res: Response) => {
    const profile = await this.createStudentService.getStudent();

    res.status(201).json(profile);


  });

}

export default StudentCreateController;