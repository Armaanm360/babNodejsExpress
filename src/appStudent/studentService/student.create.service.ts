import AbstractServices from "../../abstract/abstract.service";


class createStudentService extends AbstractServices {
  constructor() {
    super();
  }

  public async getStudent() {
    const profile = await this.db('accounts')
      .select('id', 'account_name');
    if (!profile.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      data: profile,
    };
  }


}

export default createStudentService;