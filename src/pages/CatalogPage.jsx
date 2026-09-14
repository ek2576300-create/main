import { useMemo, useState } from 'react';
import { CourseCatalogCard } from '../components/catalog/CourseCatalogCard';
import { PaymentModal } from '../components/payment/PaymentModal';

function findAuthor(course, authors) {
  return authors.find((author) => author.id === course.authorId);
}

export function CatalogPage({ courses, authors, query, onOpenCourse, onOpenAuthor }) {
  const [paymentCourse, setPaymentCourse] = useState(null);
  const filteredCourses = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return courses;

    return courses.filter((course) => {
      const author = findAuthor(course, authors);
      return [course.title, course.description, ...(course.tags || []), author?.name, author?.role]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(normalized);
    });
  }, [authors, courses, query]);

  return (
    <main className="px-3 pb-12 min-[380px]:px-4 sm:px-5 lg:ml-[190px] lg:px-[28px]">
      <div className="mx-auto max-w-[1050px] pt-2">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-[27px] min-[390px]:text-[30px] font-semibold tracking-[-.025em]">Каталог курсов</h1>
            <p className="mt-2 text-[12px] text-[#777]">
              Выберите курс. Нажатие на аватар автора открывает его отдельную страницу.
            </p>
          </div>
          <span className="text-[11px] text-[#777]">Найдено: {filteredCourses.length}</span>
        </div>

        <div className="grid grid-cols-1 gap-x-3 gap-y-7 min-[380px]:grid-cols-2 min-[480px]:gap-x-4 sm:grid-cols-3 xl:grid-cols-4 xl:gap-y-8">
          {filteredCourses.map((course) => (
            <CourseCatalogCard
              key={course.id}
              course={course}
              author={findAuthor(course, authors)}
              onOpenCourse={onOpenCourse}
              onOpenAuthor={onOpenAuthor}
              onBuyCourse={setPaymentCourse}
            />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="rounded-[16px] bg-[#f7f7f7] px-6 py-12 text-center text-[13px] text-[#777]">
            По вашему запросу курсы не найдены
          </div>
        )}
        <PaymentModal
          open={Boolean(paymentCourse)}
          course={paymentCourse}
          source="catalog_card"
          onClose={() => setPaymentCourse(null)}
        />
      </div>
    </main>
  );
}
