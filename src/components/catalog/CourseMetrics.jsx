import { Eye, Star } from 'lucide-react';

export function CourseMetrics({ likes = null, saves = null }) {
  if (likes == null && saves == null) return null;

  return (
    <div className="flex items-center gap-3 text-[9px] text-white">
      {likes != null && (
        <span className="inline-flex items-center gap-1">
          <Eye size={11} strokeWidth={1.7} /> {likes}
        </span>
      )}
      {saves != null && (
        <span className="inline-flex items-center gap-1">
          <Star size={11} strokeWidth={1.7} /> {saves}
        </span>
      )}
    </div>
  );
}
