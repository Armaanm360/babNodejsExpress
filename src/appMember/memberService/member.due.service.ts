import AbstractServices from "../../abstract/abstract.service";

class DueMemberService extends AbstractServices {
  constructor() {
    super();
  }
  // get certificate
  public async dueMember(memberId: number) {
    const duePayment = await this.db("invoice")
      .sum("paid_by AS total_due")
      .andWhere("remarks", "paid")
      .andWhere("user_id", memberId);

    // const totalPaid = await this.db("training_payment_invoice")
    //   .sum("training_payment_invoice_total_amount AS trainee_total_paid")
    //   .andWhere("training_payment_invoice_status", "paid")
    //   .andWhere("training_payment_invoice_trainee_id", memberId);

    if (!duePayment.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      data: duePayment[0],
    };
  }
}

export default DueMemberService;
