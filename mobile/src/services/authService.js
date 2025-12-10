import apiClient from './apiClient';

class AuthService {
  async login(credentials) {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  }

  async register(userData) {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  }

  async completeOnboarding(onboardingData) {
    const response = await apiClient.post('/auth/onboarding', onboardingData);
    return response.data;
  }

  async getCurrentUser() {
    const response = await apiClient.get('/auth/me');
    return response.data;
  }

  async updateProfile(profileData) {
    const response = await apiClient.put('/auth/profile', profileData);
    return response.data;
  }

  async getQRCode() {
    const response = await apiClient.get('/auth/qr-code');
    return response.data;
  }
}

export const authService = new AuthService();
