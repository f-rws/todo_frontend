import { http } from 'msw';

export const tasksHandlers = [
  http.get('/api/tasks', () => {
    console.log('/api/tasksのレスポンス');
  }),
];
