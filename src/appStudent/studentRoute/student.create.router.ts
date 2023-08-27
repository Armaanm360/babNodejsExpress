import AbstractRouter from "../../abstract/abstract.router";
import StudentCreateController from './../studentController/student.create.controller';



class studentCreateRouter extends AbstractRouter {

  private studentCreateController = new StudentCreateController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {

    this.router.route('/student-view').get(this.studentCreateController.getStudent);


  }

}


export default studentCreateRouter;