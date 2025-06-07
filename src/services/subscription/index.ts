import { subscriptionsApi } from '@/services';

export class SubscriptionService {
  async getSubscriptions(token?: string) {
    try {
      const response = await subscriptionsApi.get('subscription', {
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
        data: error?.response?.data ?? error.message,
        status: error?.response?.status ?? 400,
      };
    }
  }
  async getOneSubscriptions(userId: string, token?: string) {
    try {
      const response = await subscriptionsApi.get(`subscription/byUserId/${userId}`, {
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
        data: error?.response?.data ?? error.message,
        status: error?.response?.status ?? 400,
      };
    }
  }

  async createSubscription(body: any, token?: string) {
    try {
      const response = await subscriptionsApi.post('subscription', body, {
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
        data: error?.response?.data ?? error.message,
        status: error?.response?.status ?? 400,
      };
    }
  }
  async updateSubscription(id: string, body: any, token?: string) {
    try {
      const response = await subscriptionsApi.put('subscription', body, {
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
        data: error?.response?.data ?? error.message,
        status: error?.response?.status ?? 400,
      };
    }
  }

  async deleteSubscription(id: string, token?: string) {
    try {
      const response = await subscriptionsApi.delete(`subscription/${id}`, {
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
        data: error?.response?.data ?? error.message,
        status: error?.response?.status ?? 400,
      };
    }
  }
}
