import apiClient from './apiClient';

class AnalyticsService {
  async getDepartmentAnalytics() {
    const response = await apiClient.get('/analytics/department');
    return response.data;
  }

  async getYearAnalytics() {
    const response = await apiClient.get('/analytics/year');
    return response.data;
  }

  async getSeverityAnalytics() {
    const response = await apiClient.get('/analytics/severity');
    return response.data;
  }

  async getSessionVolume(period = 'month') {
    const response = await apiClient.get('/analytics/volume', {
      params: { period }
    });
    return response.data;
  }

  async getOverviewStats() {
    const response = await apiClient.get('/analytics/overview');
    return response.data;
  }
}

export const analyticsService = new AnalyticsService();
