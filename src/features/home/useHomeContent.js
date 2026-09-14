import { useMemo } from 'react';
import { subscriptionCourses } from '../../data/subscriptions';
import { homeBlogs, homeCourses } from './home.data';

function containsQuery(values, query) {
  return values.filter(Boolean).join(' ').toLowerCase().includes(query);
}

export function useHomeContent(query) {
  const normalizedQuery = query.trim().toLowerCase();

  return useMemo(() => {
    if (!normalizedQuery) {
      return {
        courses: homeCourses,
        subscriptionCourses,
        blogs: homeBlogs,
      };
    }

    return {
      courses: homeCourses.filter((item) =>
        containsQuery([item.author, item.title, item.category, item.description], normalizedQuery),
      ),
      subscriptionCourses: subscriptionCourses.filter((item) =>
        containsQuery(
          [
            item.category,
            item.title,
            item.subtitle,
            item.description,
            ...(item.keywords || []),
          ],
          normalizedQuery,
        ),
      ),
      blogs: homeBlogs.filter((item) =>
        containsQuery([item.title, item.category, item.tags, item.excerpt], normalizedQuery),
      ),
    };
  }, [normalizedQuery]);
}
