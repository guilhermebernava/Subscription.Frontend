import { api, httpsAgent } from '@/services';
import { IAuth } from './interface';

export class AuthService {
  async login(data: IAuth) {
    return api.post('/login', data, { httpsAgent });
  }
  createUser(data: IAuth) {
    return api.post('/createUser', data);
  }
  confirmUser(data: IAuth) {
    return api.post('/confirmSignUp', data);
  }
  resetPassword(data: IAuth) {
    return api.post('/resetPassword', data);
  }
  test() {
    return api.get('/test');
  }
}
