import AbstractServices from "../../abstract/abstract.service";

class MemberSingleService extends AbstractServices {
  constructor() {
    super();
  }
  // get certificate
  public async getMemberSingle(memberId: number) {
    const certificate = await this.db("user_member")
      .select(
        "name",
        "renewal_date",
        "board_meeting_date",
        "board_meeting_number",
        "avatar"
      )
      .where("id", memberId);
    if (!certificate.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      data: certificate[0],
    };
  }
}

export default MemberSingleService;
