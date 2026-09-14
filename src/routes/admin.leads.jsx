import { createFileRoute } from '@tanstack/react-router';
import { AdminLeadsPage } from '../pages/AdminLeadsPage';

export const Route = createFileRoute('/admin/leads')({
  component: AdminLeadsPage,
});
