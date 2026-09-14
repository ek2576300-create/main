import { createFileRoute } from '@tanstack/react-router';
import { Placeholder } from '../pages/Placeholder';
export const Route = createFileRoute('/profile')({
  component: () => <Placeholder title="Профиль" />,
});
