import type { Task } from '../types';

export function createMockTask({
  id = '0001',
  title = 'タスクのタイトル',
  description = 'タスクの詳細',
  status = 'completed',
  createdAt = '2025-05-01T12:00:00.000Z',
  updatedAt = '2025-05-01T12:00:00.000Z',
  expiredAt = '2025-06-01T12:00:00.000Z',
}: Partial<Task> = {}): Task {
  return {
    id,
    title,
    description,
    status,
    createdAt,
    updatedAt,
    expiredAt,
  };
}
