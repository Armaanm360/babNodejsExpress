import AbstractServices from "../../abstract/abstract.service";



class FindIdAndTypeWise extends AbstractServices {

  constructor() {
    super();
  }
  public async findAnyType(id: number, type: string) {

    const student = await this.db('accounts').select('*').andWhere('id', id).andWhere('account_type', type);

    if (!student.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND
      }


    }

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      data: student
    }

  }
}

export default FindIdAndTypeWise;