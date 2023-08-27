import AbstractServices from '../../abstract/abstract.service';
import {
  ICreateRoleProps,
  IUpdateRoleProps,
} from '../utils/types/admin.role.types';

class AdminRoleService extends AbstractServices {
  constructor() {
    super();
  }

  // create role
  public async createRole(prop: ICreateRoleProps) {
    const { name, created_by, permissions } = prop;
    const checkRole = await this.db('admin_role')
      .select('*')
      .where({ name: name.toLowerCase() });

    if (checkRole.length) {
      return {
        success: false,
        message: this.ResMsg.HTTP_CONFLICT,
      };
    }
    return this.db.transaction(async (trx) => {
      const insertRole = await trx('admin_role').insert({
        name: name.toLowerCase(),
        created_by,
      });

      const rolePermissions = permissions.map((item) => {
        item.role_id = insertRole[0];
        return item;
      });

      await trx('role_permissions').insert(rolePermissions);

      return {
        success: true,
        message: this.ResMsg.HTTP_SUCCESSFUL,
        data: {
          id: insertRole[0],
        },
      };
    });
  }

  // get role
  public async getRole() {
    const data = await this.db('admin_role').select('id', 'name');
    return {
      code: this.StatusCode.HTTP_OK,
      data: data,
      message: this.ResMsg.HTTP_OK,
    };
  }

  // update role
  public async updateRole(props: IUpdateRoleProps) {
    const { id, add_permissions, remove_permissions } = props;
  }
}

export default AdminRoleService;
