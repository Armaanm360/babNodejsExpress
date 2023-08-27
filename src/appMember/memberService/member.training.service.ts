import { ITrainingTrainee } from "./../../common/types/trainingTraineeTypes";
import AbstractServices from "../../abstract/abstract.service";
import Lib from "../../utils/lib/lib";
import { newTrainee } from "../../templates/newTrainee";

class MemberTrainingService extends AbstractServices {
  constructor() {
    super();
  }
  // get all training request
  public async getAllTraining() {
    const upcomingTraining = await this.db("training as tr")
      .select("tr.id", "tr.title", "tr.start_date", "tr.status")
      .where({ status: "upcoming" })
      .orderBy("created_at", "desc");
    if (!upcomingTraining.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }
    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      data: upcomingTraining,
    };
  }

  // get single training request
  public async getSingleTrainingTrainee(id: number) {
    const singleTrainingTrainee = await this.db("training as tr")
      .select(
        "tr.id",
        "tr.title",
        "tr.details",
        "tr.start_date",
        "tr.trainer_photo",
        "tr.trainer_name",
        "tr.trainer_details"
      )
      .where("tr.id", id);
    if (!singleTrainingTrainee.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }
    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      data: singleTrainingTrainee[0],
    };
  }

  // create training request
  public async traineeRequest(req: any, training_id: any, member_id: any) {
    return this.db.transaction(async (tr) => {
      const body = req.body as ITrainingTrainee;

      let user_trainee_id = await this.db("user_trainee")
        .select("id")
        .where("user_member_id", member_id);

      const training_member_id = await this.db("training_member")
        .select("id")
        .where("member_id", member_id);

      body.training_id = parseInt(training_id);
      body.training_member_id = training_member_id[0].id;
      body.user_trainee_id = user_trainee_id[0].id;

      let checkAppliedTrainee: any = await this.db("training_trainee as tr")
        .count("tr.user_trainee_id as trainee")
        .where("tr.training_id", body.training_id);

      if (checkAppliedTrainee.length > 3 || checkAppliedTrainee.length < 1) {
        return {
          success: false,
          code: this.StatusCode.HTTP_UNPROCESSABLE_ENTITY,
          message: "Applied trainee must be within 1 to 3",
        };
      }

      const checkEmailAndPhoneForTrainee = await this.db(
        "user_trainee as ut"
      ).whereIn("ut.email", [body.email]);
      // .orWhere("ut.phone", "=", body.phone); // TODO -> After adding the phone then the code will be working (Admin will add this)

      if (checkEmailAndPhoneForTrainee.length) {
        return {
          success: false,
          code: this.StatusCode.HTTP_CONFLICT,
          message: "This trainee already applied",
        };
      }
      const files = (req.files as Express.Multer.File[]) || [];

      if (files?.length) {
        req.body[files[0].fieldname] = files[0].filename;
      }

      const traineeData: any = {};
      const password = Lib.otpGenNumberAndAlphabet(8);
      const hashPass = Lib.hashPass(password);
      traineeData.password = await hashPass;
      traineeData.name = body.name_en;
      traineeData.user_member_id = parseInt(member_id) ?? null;
      traineeData.designation = body.designation ?? null;
      traineeData.email = body.email ?? null;

      await tr("user_trainee").insert(traineeData);

      const template = newTrainee(traineeData.email, password);

      await Lib.sendEmail(
        traineeData.email,
        "New Trainee is Created",
        template
      );

      const trainingRequest = await tr("training_trainee").insert(body);
      if (!trainingRequest.length) {
        return {
          success: false,
          code: this.StatusCode.HTTP_UNPROCESSABLE_ENTITY,
          message: this.ResMsg.HTTP_UNPROCESSABLE_ENTITY,
        };
      }
      return {
        success: true,
        code: this.StatusCode.HTTP_SUCCESSFUL,
        data: trainingRequest,
      };
    });
  }

  // get recent training request
  public async getRecentTraining(member_id: number) {
    const recentTraining = await this.db("training_trainee as tr")
      .select(
        "tt.id",
        "tt.title",
        "tt.details",
        "tt.start_date",
        "tt.trainer_photo",
        "tt.trainer_name",
        "tt.trainer_details"
      )
      .leftJoin("training as tt", "tr.training_id", "tt.id")
      .where("tr.training_member_id", member_id);

    if (!recentTraining.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }
    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      data: recentTraining,
    };
  }
}

export default MemberTrainingService;
