import { createFileRoute } from '@tanstack/react-router';
import { Placeholder } from '../pages/Placeholder';
export const Route = createFileRoute('/about')({
  component: () => <Placeholder title="О приложении" />,
});
