import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/tasks/')({
  component: Tasks,
});

function Tasks() {
  return <div>Tasks page</div>;
}
