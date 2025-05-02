import { subscriptionsApi } from '@/services';

export class TemplateService {
  async getTemplates() {
    try {
      const response = await subscriptionsApi.get('template');
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
  async getOneTemplates(id: string) {
    try {
      const response = await subscriptionsApi.get(`template/${id}`);
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

  async createTemplate(body: any) {
    try {
      const response = await subscriptionsApi.post('template', body);
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
  async updateTemplate(id: string, body: any) {
    try {
      const response = await subscriptionsApi.put('template', body);
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

  async deleteTemplate(id: string) {
    try {
      const response = await subscriptionsApi.delete(`template/${id}`);
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
