import apiClient from './apiClient';

class MoodService {
  async getMoods() {
    const response = await apiClient.get('/moods');
    return response.data;
  }

  async logMood(moodData) {
    const response = await apiClient.post('/moods', moodData);
    return response.data;
  }

  async getMonthMoods(year, month) {
    const response = await apiClient.get('/moods/month', {
      params: { year, month }
    });
    return response.data;
  }

  async getTodayMood() {
    const response = await apiClient.get('/moods/today');
    return response.data;
  }
}

export const moodService = new MoodService();
