import { createFileRoute } from '@tanstack/react-router';
import { Placeholder } from '../pages/Placeholder';

export const Route = createFileRoute('/purchases')({
  component: () => <Placeholder title="Покупки" />,
});
