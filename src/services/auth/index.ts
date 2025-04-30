import { authApi } from '@/services';
import { IAuth } from './interface';

export class AuthService {
  async login(data: IAuth) {
    try {
      const response = await authApi.post('login', data);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      return {
        success: false,
        data: error?.response?.data || error.message,
        status: error?.response?.status || 400,
      };
    }
  }
  
  async createUser(data: IAuth) {
    try {
      const response = await authApi.post('createUser', data);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      return {
        success: false,
        data: error?.response?.data || error.message,
        status: error?.response?.status || 400,
      };
    }
  }
  
  async confirmUser(data: IAuth) {
    try {
      const response = await authApi.post('confirmSignUp', data);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      return {
        success: false,
        data: error?.response?.data || error.message,
        status: error?.response?.status || 400,
      };
    }
  }
  
  async resetPassword(data: IAuth) {
    try {
      const response = await authApi.post('resetPassword', data);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      return {
        success: false,
        data: error?.response?.data || error.message,
        status: error?.response?.status || 400,
      };
    }
  }
  
  async test() {
    try {
      const response = await authApi.get('test');
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      return {
        success: false,
        data: error?.response?.data || error.message,
        status: error?.response?.status || 400,
      };
    }
  }
}
