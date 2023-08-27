import AbstractServices from '../../abstract/abstract.service';

class MemberProfileService extends AbstractServices {
  constructor() {
    super();
  }
  // get profile service for authentication/authorization
  public async getProfile(id: number) {
    const profile = await this.db('user_member as um')
      .select('id', 'name', 'email', 'phone', 'avatar', 'status')
      .where('id', id);

    if (!profile.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      data: profile[0],
    };
  }

  //mine
  // public async meowProfile(tag: string) {
  //   const mini = await this.db('newnumber as aktatableJust')
  //     .select('id', 'name', 'email', 'avater')
  //     .where('tag', tag);

  //   if (!mini.length) {
  //     return {
  //       success: false,
  //       code: this.StatusCode.HTTP_NOT_FOUND,
  //       message: this.ResMsg.HTTP_NOT_FOUND
  //     }

  //   }

  //   return {
  //     success: true,
  //     code: this.StatusCode.HTTP_OK,
  //     data: mini[0]
  //   }

  // }
}

export default MemberProfileService;
