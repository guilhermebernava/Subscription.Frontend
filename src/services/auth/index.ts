import { api } from '@/services';
import { IAuth } from './interface';
import { apiConfig } from '@/configs';

export class AuthService {
  async login(data: IAuth) {
    try {
      const response = await api.post('login', data);
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
      const response = await api.post('createUser', data);
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
      const response = await api.post('confirmSignUp', data);
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
      const response = await api.post('resetPassword', data);
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
      const response = await api.get('test');
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
