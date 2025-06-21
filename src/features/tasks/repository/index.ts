import { apiClient } from '@/lib/api-client';
import { ApiException } from '@/lib/exceptions/api';

export class TasksApiException extends ApiException {
  constructor(...args: ConstructorParameters<typeof ApiException>) {
    super(...args);
  }
}

export const tasksRepository = {
  async getTasks() {
    const response = await apiClient.get('/api/tasks');

    if (response.error) {
      throw new TasksApiException('Failed to fetch tasks', response.error);
    }

    return response.data;
  },
};
