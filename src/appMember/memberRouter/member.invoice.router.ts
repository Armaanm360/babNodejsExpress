import AbstractRouter from "../../abstract/abstract.router";
import MemberInvoiceController from "../memberController/member.invoice.controller";
class MemberInvoiceRouter extends AbstractRouter {
  private memberInvoiceController = new MemberInvoiceController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    // get all invoice router
    this.router.route("/").get(this.memberInvoiceController.getAllInvoice);

    // get single invoice router
    this.router
      .route("/:id")
      .get(this.memberInvoiceController.getSingleInvoice);
  }
}

export default MemberInvoiceRouter;
