import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/tasks/$taskId/')({
  component: TaskDetail,
});

function TaskDetail() {
  const { taskId } = Route.useParams();
  return <div>Task ID: {taskId}</div>;
}
