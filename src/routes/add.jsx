import { createFileRoute } from '@tanstack/react-router';
import { Placeholder } from '../pages/Placeholder';
export const Route = createFileRoute('/add')({
  component: () => <Placeholder title="Добавить видео/курс" />,
});
