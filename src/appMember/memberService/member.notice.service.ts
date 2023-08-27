import AbstractServices from "../../abstract/abstract.service";

class MemberNoticeService extends AbstractServices {
  constructor() {
    super();
  }
  // get all notice
  public async getAllNotice() {
    const notices = await this.db("member_notice as mn")
      .select("mn.id", "mn.title", "mn.file")
      .orderBy("created_at", "desc");

    if (!notices.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      data: notices,
    };
  }
}

export default MemberNoticeService;
