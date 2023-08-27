import AbstractServices from "../../abstract/abstract.service";

class MemberInvoiceService extends AbstractServices {
  constructor() {
    super();
  }
  // get all Invoice
  public async getAllInvoice() {
    const invoice = await this.db("invoice")
      .select("id", "total", "vat", "discount", "grand_total")
      .orderBy("created_at", "desc");

    if (!invoice.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      data: invoice,
    };
  }

  // get single Invoice
  public async getInvoice(id: number) {
    const invoice = await this.db("invoice")
      .select(
        "id",
        "total",
        "vat",
        "discount",
        "grand_total",
        "created_by",
        "paid_by",
        "remarks",
        "created_at"
      )
      .where("invoice.id", id);

    if (!invoice.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      data: invoice,
    };
  }
}

export default MemberInvoiceService;
