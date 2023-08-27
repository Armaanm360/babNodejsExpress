import AbstractServices from "../../abstract/abstract.service";

class MemberCertificateService extends AbstractServices {
  constructor() {
    super();
  }
  // get certificate
  public async getCertificate(id: number) {
    const certificate = await this.db("member_certificate as mc")
      .select("mc.id", "mc.certificate_number", "mc.certificate_file")
      .leftJoin("user_member as um", "mc.member_id", "um.id")
      .where("mc.member_id", id);
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

export default MemberCertificateService;
