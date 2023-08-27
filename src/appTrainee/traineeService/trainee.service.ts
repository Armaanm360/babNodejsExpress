import AbstractServices from '../../abstract/abstract.service';

class TraineeService extends AbstractServices {
  constructor() {
    super();
  }

  // get profile service for authentication/authorization
  public async getProfile(id: number) {
    const data = await this.db('user_trainee')
      .select(
        'id',
        'name',
        'user_member_id',
        'designation',
        'email',
        'phone',
        'avatar',
        'status'
      )
      .where('id', id);

    if (data.length) {
      return {
        success: true,
        code: this.StatusCode.HTTP_OK,
        data: data[0],
      };
    } else {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }
  }
}

export default TraineeService;
