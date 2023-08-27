import { Request, Response } from "express";
import AbstractController from "../../abstract/abstract.controller";
import MemberTrainingService from "../memberService/member.training.service";

class MemberTrainingController extends AbstractController {
  private memberTrainingService = new MemberTrainingService();
  constructor() {
    super();
  }

  // get all training controller
  public getAllTrainingRequest = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { code, ...data } =
        await this.memberTrainingService.getAllTraining();
      res.status(code).json(data);
    }
  );

  // get single training controller
  public getSingleTrainingRequest = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const { code, ...data } =
        await this.memberTrainingService.getSingleTrainingTrainee(parseInt(id));
      res.status(code).json(data);
    }
  );

  // create training trainee request controller
  public acceptedTraineeRequest = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { training_id, member_id } = req.query;
      const { code, ...data } = await this.memberTrainingService.traineeRequest(
        req,
        training_id,
        member_id
      );
      res.status(code).json(data);
    }
  );

  // get recent training controller
  public getRecentTraining = this.asyncWrapper.wrap(
    async (req: Request, res: Response) => {
      const { id: member_id } = req.params;
      const { code, ...data } =
        await this.memberTrainingService.getRecentTraining(parseInt(member_id));
      res.status(code).json(data);
    }
  );
}

export default MemberTrainingController;
