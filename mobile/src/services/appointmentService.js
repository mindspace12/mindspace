import apiClient from './apiClient';

class AppointmentService {
  async getCounsellors() {
    const response = await apiClient.get('/counsellors');
    return response.data;
  }

  async getTimeSlots(counsellorId, date) {
    const response = await apiClient.get(`/appointments/slots/${counsellorId}`, {
      params: { date }
    });
    return response.data;
  }

  async bookAppointment(appointmentData) {
    const response = await apiClient.post('/appointments', appointmentData);
    return response.data;
  }

  async getMyAppointments() {
    const response = await apiClient.get('/appointments/my');
    return response.data;
  }

  async getAppointmentById(id) {
    const response = await apiClient.get(`/appointments/${id}`);
    return response.data;
  }

  async cancelAppointment(id) {
    const response = await apiClient.put(`/appointments/${id}/cancel`);
    return response.data;
  }

  async rescheduleAppointment(id, newData) {
    const response = await apiClient.put(`/appointments/${id}/reschedule`, newData);
    return response.data;
  }

  async requestReschedule(id, reason) {
    const response = await apiClient.put(`/appointments/${id}/request-reschedule`, { reason });
    return response.data;
  }

  // Counsellor endpoints
  async createTimeSlot(slotData) {
    const response = await apiClient.post('/appointments/slots', slotData);
    return response.data;
  }

  async updateTimeSlot(id, slotData) {
    const response = await apiClient.put(`/appointments/slots/${id}`, slotData);
    return response.data;
  }

  async deleteTimeSlot(id) {
    const response = await apiClient.delete(`/appointments/slots/${id}`);
    return response.data;
  }

  async getMyCounsellorAppointments() {
    const response = await apiClient.get('/appointments/counsellor/my');
    return response.data;
  }
}

export const appointmentService = new AppointmentService();
