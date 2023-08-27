import AbstractServices from '../../abstract/abstract.service';
import { ICreatePermissionProps } from '../utils/types/admin.permissions.types';

class AdminPermissionsService extends AbstractServices {
  constructor() {
    super();
  }

  // create permission group
  public async createPermissionGroup(name: string) {
    const checkGroup = await this.db('permission_group')
      .select('*')
      .where({ name: name.toLowerCase() });

    if (checkGroup.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_CONFLICT,
        message: this.ResMsg.HTTP_CONFLICT,
      };
    }
    const res = await this.db('permission_group').insert({
      name: name.toLocaleLowerCase(),
    });
    return {
      success: true,
      code: this.StatusCode.HTTP_SUCCESSFUL,
      message: this.ResMsg.HTTP_SUCCESSFUL,
      data: {
        id: res[0],
      },
    };
  }

  // create permissions service
  public async createPermission({ group_id, name }: ICreatePermissionProps) {
    const res = await this.db('permissions').insert({
      group_id,
      name,
    });
    if (res.length) {
      return {
        success: true,
        code: this.StatusCode.HTTP_SUCCESSFUL,
        message: this.ResMsg.HTTP_SUCCESSFUL,
        data: {
          id: res[0],
        },
      };
    } else {
      return {
        success: false,
        code: this.StatusCode.HTTP_BAD_REQUEST,
        message: this.ResMsg.HTTP_BAD_REQUEST,
      };
    }
  }
}

export default AdminPermissionsService;
