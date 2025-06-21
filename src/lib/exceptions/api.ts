import type { ApiError } from '@/lib/api-client/types';

/**
 * 外部APIとの通信時にエラーが発生した場合の例外クラス
 */
export class ApiException extends Error {
  public name: string;
  public status: ApiError['status'];
  public originalError: Omit<ApiError['error'], 'status'>;

  constructor(message: string, error: ApiError) {
    super(message);

    this.name = 'ApiException';

    const { status, ...rest } = error;
    this.status = status;
    this.originalError = rest;
  }
}
