import type { ApiError } from '@/lib/api-client/types';
import { createTasksRepository, TasksApiException } from '..';
import type { TasksRepository } from '../types';

const mockApiClient = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
};

const mockApiErrorStatus = 500;
const mockApiErrorMessage = 'Internal Server Error';
const mockApiError: ApiError = {
    status: mockApiErrorStatus,
    message: mockApiErrorMessage,
    error: {}
};

describe('createTasksRepository', () => {
  describe('getAll', () => {
    it('正常系', async () => {
      const mockResponse: Awaited<ReturnType<TasksRepository['getAll']>> = [
        {
          id: '0001',
          title: 'タスクのタイトル',
          description: 'タスクの詳細',
          status: 'completed',
          createdAt: '2025-05-01T12:00:00.000Z',
          updatedAt: '2025-05-01T12:00:00.000Z',
          expiredAt: '2025-06-01T12:00:00.000Z',
        },
      ];
      mockApiClient.get.mockResolvedValueOnce({ data: mockResponse });

      const tasksRepository = createTasksRepository(mockApiClient);
      const response = await tasksRepository.getAll();

      expect(response).toEqual(mockResponse);
      // apiClientに渡している引数が正しいかどうか
      expect(mockApiClient.get).toHaveBeenCalledWith('/api/tasks');
    });
    it('異常系', async () => {
      mockApiClient.get.mockResolvedValue({ error: mockApiError });

      const tasksRepository = createTasksRepository(mockApiClient);

      await expect(tasksRepository.getAll()).rejects.toBeInstanceOf(TasksApiException);
      await expect(tasksRepository.getAll()).rejects.toThrow('Failed to fetch tasks');
    });
  });
});
