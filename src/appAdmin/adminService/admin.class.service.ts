import { Request } from "express";
import { IPromiseRes } from "../../common/types/commontypes";
import AbstractServices from "../../abstract/abstract.service";
import { callSingleParamStoredProcedure } from "../../utils/procedure/common-procedure";

class AdminClassService extends AbstractServices {
  constructor() {
    super();
  }

  // create class
  public async createClass(req: Request): Promise<IPromiseRes<{ id: number }>> {
    const checkTraining = await this.db("training")
      .select("title")
      .where({ id: req.body.training_id });

    if (!checkTraining.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }

    const res = await this.db("class").insert(req.body);

    if (!res.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_INTERNAL_SERVER_ERROR,
        message: this.ResMsg.HTTP_INTERNAL_SERVER_ERROR,
      };
    }

    return {
      success: true,
      code: this.StatusCode.HTTP_SUCCESSFUL,
      message: this.ResMsg.HTTP_SUCCESSFUL,
      data: { id: res[0] },
    };
  }

  // get single class
  public async getSingleClass(req: Request): Promise<IPromiseRes<any>> {
    const { id } = req.params;

    const data = await callSingleParamStoredProcedure(
      "getSingleClassByClassId",
      parseInt(id)
    );

    if (!data.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      data,
    };
  }
}

export default AdminClassService;
