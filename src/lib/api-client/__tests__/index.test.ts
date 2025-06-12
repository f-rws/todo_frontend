import type { AxiosError } from 'axios';
import { apiClient } from '..';
import { axiosInstance } from '../axiosApiClient';

type MockAxiosError = Pick<AxiosError, 'message' | 'isAxiosError'> & {
  response: Pick<NonNullable<AxiosError['response']>, 'status'>;
};

describe('apiClientのテスト', () => {
  describe('get', () => {
    it('正常系', async () => {
      const mockResponse = { testKey: 'testValue' };
      vi.spyOn(axiosInstance, 'get').mockResolvedValue({ data: mockResponse });

      const response = await apiClient.get('/tasks/');

      expect(response.data).toEqual(mockResponse);
      expect(response.error).toBeUndefined();
    });

    it('異常系', async () => {
      const mockStatus = 500;
      const mockMessage = 'Internal Server Error';
      const mockAxiosError: MockAxiosError = {
        isAxiosError: true,
        response: {
          status: mockStatus,
        },
        message: mockMessage,
      };
      // axiosInstance.getメソッドはAxiosErrorをrejectする
      vi.spyOn(axiosInstance, 'get').mockRejectedValue(mockAxiosError);

      const response = await apiClient.get('/tasks/');

      expect(response.data).toBeUndefined();
      expect(response.error).toEqual({
        status: mockStatus,
        message: mockMessage,
        error: mockAxiosError,
      });
    });
  });

  describe('post', () => {
    it('正常系', async () => {
      const mockRequestData = { testKey: 'testValue' };
      vi.spyOn(axiosInstance, 'post').mockResolvedValue({ data: null });

      const response = await apiClient.post('/tasks/', mockRequestData);

      expect(response.data).toEqual(null);
      expect(response.error).toBeUndefined();
    });

    it('異常系', async () => {
      const mockRequestData = { testKey: 'testValue' };
      const mockStatus = 500;
      const mockMessage = 'Internal Server Error';
      const mockAxiosError: MockAxiosError = {
        isAxiosError: true,
        response: {
          status: mockStatus,
        },
        message: mockMessage,
      };
      vi.spyOn(axiosInstance, 'post').mockRejectedValue(mockAxiosError);

      const response = await apiClient.post('/tasks/', mockRequestData);

      expect(response.data).toBeUndefined();
      expect(response.error).toEqual({
        status: mockStatus,
        message: mockMessage,
        error: mockAxiosError,
      });
    });
  });

  describe('put', () => {
    it('正常系', async () => {
      const mockRequestData = { testKey: 'testValue' };
      vi.spyOn(axiosInstance, 'put').mockResolvedValue({ data: null });

      const response = await apiClient.put('/tasks/', mockRequestData);

      expect(response.data).toEqual(null);
      expect(response.error).toBeUndefined();
    });
    it('異常系', async () => {
      const mockRequestData = { testKey: 'testValue' };
      const mockStatus = 500;
      const mockMessage = 'Internal Server Error';
      const mockAxiosError: MockAxiosError = {
        isAxiosError: true,
        response: {
          status: mockStatus,
        },
        message: mockMessage,
      };
      vi.spyOn(axiosInstance, 'put').mockRejectedValue(mockAxiosError);

      const response = await apiClient.put('/tasks/1/', mockRequestData);

      expect(response.data).toBeUndefined();
      expect(response.error).toEqual({
        status: mockStatus,
        message: mockMessage,
        error: mockAxiosError,
      });
    });
  });

  describe('delete', () => {
    it('正常系', async () => {
      vi.spyOn(axiosInstance, 'delete').mockResolvedValue({ data: null });

      const response = await apiClient.delete('/tasks/');

      expect(response.data).toBe(null);
      expect(response.error).toBeUndefined();
    });

    it('異常系', async () => {
      const mockStatus = 500;
      const mockMessage = 'Internal Server Error';
      const mockAxiosError: MockAxiosError = {
        isAxiosError: true,
        response: {
          status: mockStatus,
        },
        message: mockMessage,
      };
      vi.spyOn(axiosInstance, 'delete').mockRejectedValue(mockAxiosError);

      const response = await apiClient.delete('/tasks/1/');

      expect(response.data).toBeUndefined();
      expect(response.error).toEqual({
        status: mockStatus,
        message: mockMessage,
        error: mockAxiosError,
      });
    });
  });
});
