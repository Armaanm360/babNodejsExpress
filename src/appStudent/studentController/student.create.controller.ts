import AbstractController from "../../abstract/abstract.controller";
import { Request, Response } from 'express';
import createStudentService from './../studentService/student.create.service';
import FindStudent from "../studentService/student.find.service";
import { Request } from "aws-sdk";
import FindIdAndTypeWise from "../studentService/student.idAndType.service";



class StudentCreateController extends AbstractController {
  private createStudentService = new createStudentService();
  private findStudent = new FindStudent();
  private findIdAndType = new FindIdAndTypeWise();

  public getStudent = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const profile = await this.createStudentService.getStudent();

      res.status(201).json(profile);


    }

  );

  public getStudentIdWise = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const { code, ...student } = await this.findStudent.findAnyStudent(parseInt(id));
      res.status(code).json(student);

    }
  );


  public getStudentIdAndType = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const { type } = req.params;
      const { code, ...student } = await this.findIdAndType.findAnyType(parseInt(id), type);
      res.status(code).json(student);

    }
  );

}

export default StudentCreateController;