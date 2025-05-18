export type Task = {
  id: string;
  title: string;
  description: string;
  status: 'notStarted' | 'inProgress' | 'completed';
  createdAt: string;
  updatedAt: string | null;
  expiredAt: string;
};
