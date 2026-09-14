import { createFileRoute } from '@tanstack/react-router';
import { Placeholder } from '../pages/Placeholder';

export const Route = createFileRoute('/favorites')({
  component: () => <Placeholder title="Избранное" />,
});
