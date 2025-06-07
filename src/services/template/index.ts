import { subscriptionsApi } from '@/services';

export class TemplateService {
  async getTemplates(token?: string) {
    try {
      const response = await subscriptionsApi.get('template', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
  async getOneTemplates(id: string, token?: string) {
    try {
      const response = await subscriptionsApi.get(`template/byUserId/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  async createTemplate(body: any, token?: string) {
    try {
      const response = await subscriptionsApi.post('template', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
  async updateTemplate(id: string, body: any, token?: string) {
    try {
      const response = await subscriptionsApi.put('template', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  async deleteTemplate(id: string, token?: string) {
    try {
      const response = await subscriptionsApi.delete(`template/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
