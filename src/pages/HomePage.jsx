import { useMemo, useRef, useState } from "react";
import { HomeBlogCard } from "../components/home/HomeBlogCard";
import { HomeCourseCard } from "../components/home/HomeCourseCard";
import { HomeHero } from "../components/home/HomeHero";
import { HomeSectionHeader } from "../components/home/HomeSectionHeader";
import { SubscriptionCourseCard } from "../components/home/SubscriptionCourseCard";
import { SubscriptionPromoBanner } from "../components/home/SubscriptionPromoBanner";
import { useHomeContent } from "../features/home/useHomeContent";
import { Reveal } from "../components/motion/Reveal";
import { PaymentModal } from "../components/payment/PaymentModal";
import { courses } from "../data/catalog";

export function HomePage({ query, onOpenCourse, onOpenCatalog, onOpenBlog, onOpenBlogs, onOpenReels }) {
  const coursesSliderRef = useRef(null);
  const subscriptionSliderRef = useRef(null);
  const [paymentCourseId, setPaymentCourseId] = useState(null);
  const paymentCourse = useMemo(
    () => courses.find((course) => course.id === paymentCourseId) || null,
    [paymentCourseId],
  );
  const {
    courses: visibleCourses,
    subscriptionCourses: visibleSubscriptionCourses,
    blogs: visibleBlogs,
  } = useHomeContent(query);

  return (
    <main className="px-3 pb-16 min-[380px]:px-4 sm:px-5 sm:pb-20 lg:ml-[190px] lg:px-[29px]">
      <div className="mx-auto max-w-[1050px]">
        <Reveal delay={40} distance={16}>
          <HomeHero onOpenReels={onOpenReels} />
        </Reveal>

        <Reveal as="section" className="mt-8 sm:mt-10" delay={80}>
          <HomeSectionHeader
            title="Микрокурсы"
            onAll={onOpenCatalog}
            sliderRef={coursesSliderRef}
          />
          {visibleCourses.length ? (
            <div
              ref={coursesSliderRef}
              className="home-slider -mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-3 min-[380px]:-mx-4 min-[380px]:px-4 sm:mx-0 sm:gap-4 sm:px-0"
            >
              {visibleCourses.map((item) => (
                <div
                  key={item.courseId}
                  className="home-course-slide shrink-0 snap-start"
                >
                  <HomeCourseCard item={item} onOpenCourse={onOpenCourse} onBuyCourse={setPaymentCourseId} />
                </div>
              ))}
            </div>
          ) : (
            <p className="py-10 text-sm text-[#777]">
              Микрокурсы по вашему запросу не найдены.
            </p>
          )}
        </Reveal>

        <Reveal
          as="section"
          className="mt-9 overflow-hidden rounded-[20px] bg-[#f4f4f1] px-3 py-4 min-[390px]:px-4 min-[390px]:py-5 sm:mt-11 sm:rounded-[24px] sm:px-5 sm:py-6"
          delay={90}
        >
          <HomeSectionHeader
            eyebrow="AskHow Business"
            title="Курсы по подписке"
            description="10 прикладных курсов для предпринимателей: налоги, договоры, проверки, кассы и маркетинг — в одной подписке."
            sliderRef={subscriptionSliderRef}
          />
          {visibleSubscriptionCourses.length ? (
            <div
              ref={subscriptionSliderRef}
              className="home-slider -mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-1 min-[390px]:-mx-4 min-[390px]:px-4 sm:-mx-5 sm:px-5"
            >
              {visibleSubscriptionCourses.map((item) => (
                <div
                  key={item.id}
                  className="home-subscription-slide shrink-0 snap-start"
                >
                  <SubscriptionCourseCard item={item} />
                </div>
              ))}
            </div>
          ) : (
            <p className="py-8 text-sm text-[#777]">
              Курсы по подписке по вашему запросу не найдены.
            </p>
          )}
        </Reveal>

        <Reveal as="section" className="mt-4 sm:mt-5" delay={95}>
          <SubscriptionPromoBanner />
        </Reveal>

        {visibleBlogs.length > 0 && (
          <Reveal as="section" className="mt-9 sm:mt-11" delay={100}>
            <HomeSectionHeader title="Полезные статьи" onAll={onOpenBlogs} />
            <div className="grid grid-cols-1 gap-5 min-[520px]:grid-cols-2 lg:grid-cols-3">
              {visibleBlogs.slice(0, 6).map((item) => (
                <HomeBlogCard key={item.id} item={item} onOpenBlog={onOpenBlog} />
              ))}
            </div>
          </Reveal>
        )}
        <PaymentModal
          open={Boolean(paymentCourse)}
          course={paymentCourse}
          source="home_course_card"
          onClose={() => setPaymentCourseId(null)}
        />
      </div>
    </main>
  );
}
