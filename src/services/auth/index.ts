import { api } from '@/services';
import { IAuth } from './interface';
import { apiConfig } from '@/configs';

export class AuthService {
  async login(data: IAuth) {
    return api.post('login', data);
  }
  createUser(data: IAuth) {
    return api.post('createUser', data);
  }
  confirmUser(data: IAuth) {
    return api.post('confirmSignUp', data);
  }
  resetPassword(data: IAuth) {
    return api.post('resetPassword', data);
  }
  test() {
    return api.get('test');
  }
}
