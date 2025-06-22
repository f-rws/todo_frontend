import { http, HttpResponse } from 'msw';
import type { AsyncReturnType } from '@/lib/types';
import type { TasksRepository } from '../repository';
import { createMockTask } from '.';

const getAllMockData: AsyncReturnType<TasksRepository['getAll']> = [
  createMockTask(),
  createMockTask({ id: '0002' }),
  createMockTask({ id: '0003' }),
  createMockTask({ id: '0004' }),
];

export const tasksHandlers = [http.get('/api/tasks', () => HttpResponse.json(getAllMockData))];
