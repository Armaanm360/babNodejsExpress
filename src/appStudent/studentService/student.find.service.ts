import AbstractServices from '../../abstract/abstract.service';

class FindStudent extends AbstractServices {
  constructor() {
    super();
  }

  public async findAnyStudent(id: number) {
    const student = await this.db('accounts').select('*').where('id', id);

    if (!student.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      data: student[0],
    };
  }
}

export default FindStudent;
