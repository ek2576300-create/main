import { createFileRoute } from '@tanstack/react-router';
import { Placeholder } from '../pages/Placeholder';
export const Route = createFileRoute('/sales')({
  component: () => <Placeholder title="Инструменты продаж" />,
});
