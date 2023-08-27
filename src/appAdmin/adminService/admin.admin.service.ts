import AbstractServices from '../../abstract/abstract.service';
import {
  IAdminUpdatePayload,
  ICreateAdminPayload,
} from '../utils/types/admin.admin.types';

class AdminAdminService extends AbstractServices {
  constructor() {
    super();
  }

  // get profile service for authentication/authorization
  public async getProfile(id: number) {
    const data = await this.db('user_admin AS ua')
      .select(
        'ua.id',
        'email',
        'ua.name AS admin_name',
        'ua.avatar',
        'ar.name AS role_name',
        'ua.status'
      )
      .join('admin_role AS ar', 'ua.role', 'ar.id')
      .where('ua.id', id);

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

  // create admin service
  public async createAdmin(payload: ICreateAdminPayload) {
    const check = await this.db('user_admin')
      .select('*')
      .where('email', payload.email);

    if (check.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_CONFLICT,
        message: 'Email already exist',
      };
    }

    const data = await this.db('user_admin').insert(payload);
    if (data.length) {
      return {
        success: true,
        data: {
          id: data[0],
          avatar: payload.avatar,
        },
        message: this.ResMsg.HTTP_SUCCESSFUL,
        code: this.StatusCode.HTTP_SUCCESSFUL,
      };
    } else {
      return {
        success: false,
        code: this.StatusCode.HTTP_BAD_REQUEST,
        message: this.ResMsg.HTTP_BAD_REQUEST,
      };
    }
  }

  // get all admin service with filter skip limit for pagination
  public async getAdmin(
    name: string | undefined,
    status: number | undefined,
    skip: number | undefined,
    limit: number | undefined
  ) {
    const query = this.db('user_admin AS ua')
      .select(
        'ua.id',
        'ua.name',
        'ua.avatar',
        'ar.name AS role_name',
        'ua.status'
      )
      .join('admin_role AS ar', 'ua.role', 'ar.id')
      .andWhere((qb) => {
        if (status) {
          qb.andWhere('ua.status', status);
        }
        if (name) {
          qb.andWhereILike('ua.name', `%${name}%`);
        }
      })
      .orderBy('ua.created_at', 'desc');

    let total = (
      await this.db('user_admin')
        .count('id AS total')
        .andWhere((qb) => {
          if (status) {
            qb.andWhere('ua.status', status);
          }
          if (name) {
            qb.andWhereILike('ua.name', `%${name}%`);
          }
        })
    )[0].total as number;

    if (skip && limit) {
      query.limit(limit).offset(skip);
    }

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      data: await query,
      total,
    };
  }

  // get a single admin with all information
  public async getAnAdmin(id: number | string) {
    const data = await this.db('user_admin AS ua')
      .select(
        'ua.id',
        'ua.name',
        'ua.email',
        'ua.phone',
        'ua.avatar',
        'ar.name AS role_name',
        'ar.id AS role_id',
        'ua.status',
        'ua.created_at'
      )
      .join('admin_role AS ar', 'ua.role', 'ar.id')
      .where('ua.id', id);

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

  // update an admin service status, role etc
  public async updateAdmin(id: number | string, payload: IAdminUpdatePayload) {
    if (!Object.keys(payload).length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_BAD_REQUEST,
        message: this.ResMsg.HTTP_BAD_REQUEST,
      };
    }

    const check = await this.db('user_admin').select('avatar').where({ id });

    if (!check.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }

    const data = await this.db('user_admin').update(payload).where({ id });

    if (data) {
      if (check[0].avatar) {
        await this.manageFile.deleteFromCloud([check[0].avatar]);
      }
      return {
        success: true,
        code: this.StatusCode.HTTP_ACCEPTED,
        message: this.ResMsg.HTTP_ACCEPTED,
      };
    } else {
      return {
        success: false,
        code: this.StatusCode.HTTP_INTERNAL_SERVER_ERROR,
        message: this.ResMsg.HTTP_INTERNAL_SERVER_ERROR,
      };
    }
  }
}

export default AdminAdminService;
