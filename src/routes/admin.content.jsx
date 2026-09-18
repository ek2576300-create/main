import { createFileRoute } from '@tanstack/react-router';
import { AdminContentPage } from '../pages/AdminContentPage';

export const Route = createFileRoute('/admin/content')({
  component: AdminContentPage,
});
