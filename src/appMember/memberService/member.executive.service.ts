import AbstractServices from "../../abstract/abstract.service";

class CommitteeMemberService extends AbstractServices {
  constructor() {
    super();
  }
  // get all notice
  public async getCommitteeMember() {
    const notices = await this.db("member_committee_members as mc")
      .select("mc.id", "mc.name", "mc.designation", "mc.type")
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

export default CommitteeMemberService;
