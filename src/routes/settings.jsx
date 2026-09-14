import { createFileRoute } from '@tanstack/react-router';
import { Placeholder } from '../pages/Placeholder';
export const Route = createFileRoute('/settings')({
  component: () => <Placeholder title="Настройки" />,
});
