import AbstractServices from '../../abstract/abstract.service';
import { CreatingAppInterface } from '../utils/create.app';

class CrudAppService extends AbstractServices {
  public async createService({ app_name, app_detail }: CreatingAppInterface) {
    const res = await this.db('apps').insert({ app_name, app_detail });

    if (res.length) {
      return {
        succcess: true,
        code: 201,
        message: 'App Added Successfully',
        data: { app_name, app_detail },
      };
    } else {
      return {
        success: false,
        code: 401,
        message: 'Data not found',
      };
    }
  }

  public async getListService() {
    const apps = await this.db('apps').select('*');
    console.log(apps);

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      data: apps,
    };
  }
}

export default CrudAppService;
