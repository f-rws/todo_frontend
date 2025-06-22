import type { Task } from '../types';

export type TasksRepository = {
  getAll: () => Promise<Task[]>;
};
