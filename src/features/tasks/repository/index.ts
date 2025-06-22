import { ApiException } from '@/lib/exceptions/api';
import type { ApiClient } from '@/lib/api-client/types.ts';
import type { TasksRepository } from './types.ts';

export class TasksApiException extends ApiException {
  constructor(...args: ConstructorParameters<typeof ApiException>) {
    super(...args);
  }
}

export function createTasksRepository(apiClient: ApiClient): TasksRepository {
  return {
    async getAll() {
      const response = await apiClient.get<ReturnType<TasksRepository['getAll']>>('/api/tasks');

      if (response.error) {
        throw new TasksApiException('Failed to fetch tasks', response.error);
      }

      return response.data;
    },
  };
}
