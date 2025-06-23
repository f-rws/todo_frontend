import { useEffect, useState } from 'react';
import { createTasksRepository } from '@/features/tasks/repository';
import type { Task } from '@/features/tasks/types';
import { apiClient } from '@/lib/api-client';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/tasks/')({
  component: Tasks,
});

function Tasks() {
  const [tasks, setTasks] = useState<Task[] | undefined>(undefined);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const tasksRepository = createTasksRepository(apiClient);
    const response = await tasksRepository.getAll();
    setTasks(response);
  }

  return (
    <div>
      <h2>Tasks page</h2>
      {tasks?.length ? tasks.map((task) => <pre>{task.id}</pre>) : null}
    </div>
  );
}
