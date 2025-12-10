import apiClient from './apiClient';
import { storageService } from './storageService';

class JournalService {
  async getJournals() {
    try {
      const response = await apiClient.get('/journals');
      return response.data;
    } catch (error) {
      // If offline, return offline journals
      return await storageService.getOfflineJournals();
    }
  }

  async createJournal(journalData) {
    try {
      const response = await apiClient.post('/journals', journalData);
      return response.data;
    } catch (error) {
      // Save offline if request fails
      const offlineJournals = await storageService.getOfflineJournals();
      const newJournal = {
        ...journalData,
        tempId: Date.now().toString(),
        createdAt: new Date().toISOString(),
        isOffline: true,
      };
      offlineJournals.push(newJournal);
      await storageService.saveOfflineJournals(offlineJournals);
      return newJournal;
    }
  }

  async updateJournal(id, journalData) {
    const response = await apiClient.put(`/journals/${id}`, journalData);
    return response.data;
  }

  async deleteJournal(id) {
    const response = await apiClient.delete(`/journals/${id}`);
    return response.data;
  }

  async syncOfflineJournals() {
    const offlineJournals = await storageService.getOfflineJournals();
    const syncedJournals = [];

    for (const journal of offlineJournals) {
      try {
        const { tempId, isOffline, ...journalData } = journal;
        const response = await apiClient.post('/journals', journalData);
        syncedJournals.push(response.data);
      } catch (error) {
        console.error('Error syncing journal:', error);
      }
    }

    // Clear offline journals after successful sync
    if (syncedJournals.length === offlineJournals.length) {
      await storageService.clearOfflineJournals();
    }

    return syncedJournals;
  }
}

export const journalService = new JournalService();
