import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/tasks/')({
  component: Tasks,
});

function Tasks() {
  useEffect(() => {
    fetch('/api/tasks');
  }, []);

  return <div>Tasks page</div>;
}
