import apiClient from './apiClient';

class SessionService {
  async getSessions() {
    const response = await apiClient.get('/sessions');
    return response.data;
  }

  async getSessionById(id) {
    const response = await apiClient.get(`/sessions/${id}`);
    return response.data;
  }

  async startSession(qrData) {
    const response = await apiClient.post('/sessions/start', { qrData });
    return response.data;
  }

  async endSession(sessionId, sessionData) {
    const response = await apiClient.post(`/sessions/${sessionId}/end`, sessionData);
    return response.data;
  }

  async getStudentHistory(studentId) {
    const response = await apiClient.get(`/sessions/student/${studentId}`);
    return response.data;
  }

  async submitFeedback(sessionId, feedback) {
    const response = await apiClient.post(`/sessions/${sessionId}/feedback`, feedback);
    return response.data;
  }
}

export const sessionService = new SessionService();
