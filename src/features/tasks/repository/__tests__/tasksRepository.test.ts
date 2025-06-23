import type { ApiError } from '@/lib/api-client/types';
import type { AsyncReturnType } from '@/lib/types';
import { createMockTask } from '../../mocks';
import { createTasksRepository, TasksApiException } from '..';
import type { TasksRepository } from '..';

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
  error: {},
};

describe('createTasksRepository', () => {
  describe('getAll', () => {
    it('正常系', async () => {
      const mockResponse: AsyncReturnType<TasksRepository['getAll']> = [createMockTask()];
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
