import AbstractServices from "../../abstract/abstract.service";

class MemberBankInfoService extends AbstractServices {
  constructor() {
    super();
  }
  // get single bank info
  public async getBankInfo() {
    const bankInfo = await this.db("user_member as um").select(
      "id",
      "name",
      "email",
      "phone",
      "address",
      "board_meeting_number",
      "board_meeting_date",
      "chairman_signature"
    );

    if (!bankInfo.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      data: bankInfo[0],
    };
  }
}

export default MemberBankInfoService;
