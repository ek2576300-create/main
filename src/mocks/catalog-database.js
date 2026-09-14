const SITE_URL = 'https://app.askhow.ru';

const resumeLessons = [
  ['Урок 1. Введение. Что важно знать при подготовке к созданию резюме?', '8:32', '1.jpg'],
  ['Урок 2. Главные мифы о резюме: что писать обязательно, а что писать не нужно?', '6:31', '2.jpg'],
  ['Урок 3. Запреты и общие рекомендации по составлению резюме', '5:59', '3.jpg'],
  ['Урок 4. Технология написания резюме. Пошаговая инструкция', '6:36', '4.jpg'],
  ['Урок 5 (часть 1). Вопросы для сбора информации и структура резюме', '4:34', '5.jpg'],
  ['Урок 5 (часть 2). Вопросы для сбора информации и структура резюме', '4:58', '6.jpg'],
  ['Урок 6. Главные блоки резюме: ключевые компетенции и основные результаты работы', '10:30', '7.jpg'],
  ['Урок 7. Создаём резюме по чек-листу под конкретную вакансию', '4:49', '8.jpg'],
  ['Урок 8. Визуализация в резюме: оформление текста и подбор фотографии', '4:30', '9.jpg'],
  ['Урок 9. Сложные случаи. Как подавать информацию?', '6:11', '10.jpg'],
  ['Дополнительный урок 1. Семь причин, почему с поиском работы не складывается', '9:12', '11.jpg'],
  ['Дополнительный урок 2. Как пережить отказ?', '6:53', '12.jpg'],
  ['Дополнительный урок 3. Выгорание: как распознать и справиться', '7:31', '13.jpg'],
].map(([title, duration, image], index) => ({
  id: `resume-lesson-${index + 1}`,
  title,
  subtitle: 'Урок курса «Создание продающего резюме».',
  duration,
  image: `/images/authors/alexandra-nikitina/lessons/${image}`,
  free: index === 0,
  featured: index === 0,
  tags: ['#резюме', '#карьера'],
}));

const igorMalininLessons = [
  ['Зачем нужна публичность', '8:47', 1],
  ['Как создать грамотное УТП и адаптировать пресс-релиз под разные медиа', '4:14', 2],
  ['Что такое SERM и чем отличается от SEO', '9:56', 3],
  ['Какие бывают СМИ', '3:42', 4],
  ['Способы появления в СМИ', '9:59', 5],
  ['Какого эффекта ждать от PR', '8:23', 6],
].map(([title, duration, imageNumber], index) => ({
  id: `igor-malinin-lesson-${index + 1}`,
  title,
  subtitle: 'Урок курса о публичности бренда, PR, СМИ и интернет-репутации.',
  duration,
  image: `/images/authors/igor-malinin/lessons/${imageNumber}.jpg`,
  free: index === 0,
  featured: index === 0,
  tags: ['#PR', '#СМИ', '#SERM'],
}));


const artemMushinLessons = [
  ['В чём цель интервьюера и как ваша история может ему помочь', '10:39'],
  ['Где брать истории, если кажется, что вам нечего рассказать', '15:29'],
  ['Почему цепочка фактов не вдохновляет и как рассказывать, чтобы запоминаться', '7:20'],
  ['Как донести до слушателя тот смысл, который вам нужен', '12:40'],
  ['Как добавить эмоции, метафоры и диалоги, но не переборщить', '8:40'],
  ['Как перейти к истории, выйти из истории и создать цепочку из нескольких историй', '9:26'],
  ['Как ответить на самый абстрактный в мире вопрос и превратить карьерный путь в историю', '10:16'],
  ['Победы, провалы, сильные и слабые стороны', '11:29'],
  ['Как ответить историей на теоретические вопросы', '6:54'],
  ['Как запомниться, задавая вопросы, и как исторически завершить интервью', '6:37'],
].map(([title, duration], index) => ({
  id: `artem-mushin-lesson-${index + 1}`,
  title: `Урок №${index + 1}. ${title}`,
  subtitle: 'Урок курса о стратегическом сторителлинге для собеседований и интервью.',
  duration,
  image: `/images/authors/artem-mushin/lessons/${index + 1}.png`,
  free: index === 0,
  featured: index === 0,
  tags: ['#сторителлинг', '#интервью', '#карьера'],
}));


const alexeyMarkovLessons = [
  ['Основы самопрезентации', '2:58'],
  ['Разбор кейса: неудачная самопрезентация — фразы и жесты, которых стоит избегать', '6:36'],
  ['Построение образа: кто я и почему о себе так сложно говорить?', '4:57'],
  ['Структура и содержание представления', '7:21'],
  ['Как говорить уверенно', '4:14'],
  ['Крючки внимания и внешний вид', '5:08'],
  ['Работа с вопросами и критикой', '4:29'],
  ['Как справиться с волнением перед выступлением', '3:42'],
  ['Разбор кейса: успешная самопрезентация', '2:27'],
  ['Работа над ошибками: мотивация и вдохновение работать над своей самопрезентацией', '3:36'],
].map(([title, duration], index) => ({
  id: `alexey-markov-lesson-${index + 1}`,
  title: `${index + 1}. ${title}`,
  subtitle: 'Урок курса об эффективной самопрезентации и уверенном рассказе о себе.',
  duration,
  image: `/images/authors/alexey-markov/lessons/${index + 1}.jpg`,
  free: index === 0,
  featured: index === 0,
  tags: ['#самопрезентация', '#публичныевыступления', '#личныйбренд'],
}));


const yuliaVolkovaLessons = [
  ['Приветствие', '1:08', 'cover.jpg'],
  ['О чём вебинар', '5:44', '2.jpg'],
  ['Отличия', '11:32', '3.jpg'],
  ['СНО', '18:37', '4.jpg'],
  ['ОКВЭД', '5:38', '5.jpg'],
  ['Регистрация', '8:48', '6.jpg'],
  ['ЭЦП', '9:04', '7.jpg'],
  ['Сдача отчётов ФНС', '5:02', '8.jpg'],
  ['Отчёты ИП, ООО', '10:33', '9.jpg'],
  ['Способы сдачи отчётности', '7:07', '10.jpg'],
  ['Вывод', '3:24', 'cover.jpg'],
].map(([title, duration, image], index) => ({
  id: `yulia-volkova-lesson-${index + 1}`,
  title,
  subtitle: 'Урок курса о выборе формы бизнеса, системы налогообложения и сдаче отчётности.',
  duration,
  image: `/images/authors/yulia-volkova/lessons/${image}`,
  free: index === 0,
  featured: index === 0,
  tags: ['#налоги', '#отчётность', '#бизнес'],
}));

const authorsBase = [
  {
    id: 'igor-malinin', name: 'Игорь Малинин', role: 'Эксперт по PR и интернет-репутации',
    avatar: '/images/authors/igor-malinin/media/author.jpg', cover: '/images/authors/igor-malinin/media/author.jpg',
    description: 'Автор курса «Как бизнесу нарастить свою публичность: от попадания в СМИ до развития интернет-репутации».',
    tags: ['#PR', '#СМИ', '#репутация'],
  },
  {
    id: 'pavel-semenov', name: 'Павел Семенов', role: 'Эксперт по бизнес-гипотезам',
    avatar: '/images/authors/pavel-semenov/media/author.jpg', cover: '/images/authors/pavel-semenov/media/author.jpg',
    description: 'Автор вводного курса о том, как ставить, формулировать и выбирать бизнес-гипотезы, опираясь на финансовые метрики.',
    tags: ['#гипотезы', '#бизнес', '#рост'],
  },
  {
    id: 'artem-mushin', name: 'Артём Мушин-Македонский', role: 'Эксперт по стратегическому сторителлингу',
    avatar: '/images/authors/artem-mushin/author-real.jpg', cover: '/images/authors/artem-mushin/author-real.jpg',
    description: 'Автор курса «Стратегический сторителлинг для собеседований и интервью» о том, как превращать повседневные события в истории, создающие сильное первое впечатление.',
    tags: ['#сторителлинг', '#интервью', '#коммуникация'],
  },
  {
    id: 'yulia-volkova', name: 'Юлия Александровна Волкова', role: 'Эксперт по налогам и отчётности',
    avatar: '/images/authors/yulia-volkova/author-real.jpg', cover: '/images/authors/yulia-volkova/author-real.jpg',
    description: 'Автор курса о выборе системы налогообложения, формы владения бизнесом, отчётности и сроках её сдачи.',
    tags: ['#налоги', '#отчётность', '#бизнес'],
  },
  {
    id: 'alexandra-nikitina', name: 'Александра Никитина', role: 'Эксперт по карьере и рекрутингу',
    avatar: '/images/authors/alexandra-nikitina/author.jpg', cover: '/images/authors/alexandra-nikitina/author.jpg',
    description: 'Автор курса «Создание продающего резюме: твой путь к работе мечты».',
    tags: ['#карьера', '#резюме', '#поискработы'],
  },
  {
    id: 'konstantin-kharsky', name: 'Константин Харский', role: 'Эксперт по продажам и покупательскому поведению',
    avatar: 'https://bestspeakers.ru/wp-content/uploads/2022/01/Luchshie-spikery-Konstantin-Harskij-800x600.jpg', cover: 'https://bestspeakers.ru/wp-content/uploads/2022/01/Luchshie-spikery-Konstantin-Harskij-800x600.jpg',
    description: 'Автор курса «Управление покупательскими состояниями. Продажи по-новому» о новом подходе к продажам и состояниях покупателя.',
    tags: ['#продажи', '#покупатель', '#управление'],
  },
  {
    id: 'alexey-markov', name: 'Алексей Марков', role: 'Эксперт по самопрезентации, голосу и публичным выступлениям',
    avatar: '/images/authors/alexey-markov/author.jpg', cover: '/images/authors/alexey-markov/author.jpg',
    description: 'Автор курсов по эффективной самопрезентации, дыханию и голосу для публичных выступлений, а также развитию голоса и резонаторов.',
    tags: ['#самопрезентация', '#голос', '#выступления'],
  },
  {
    id: 'igor-veretennikov', name: 'Игорь Веретенников', role: 'Эксперт по финансовому управлению',
    avatar: '/images/home/avatar-igor-veretennikov.jpg', cover: '/images/home/avatar-igor-veretennikov.jpg',
    description: 'Автор курса «Лёгкие финансы: мастерство финансового управления» о финансовом управлении и ключевых финансовых отчётах.',
    tags: ['#финансы', '#управление', '#бизнес'],
  },
  {
    id: 'darya-filimonova', name: 'Дарья Филимонова', role: 'Маркетолог-аналитик и стратег',
    avatar: '/images/authors/darya-filimonova/media/author.jpg', cover: '/images/authors/darya-filimonova/media/author.jpg',
    description: 'Маркетолог-аналитик, стратег. Опыт >15 лет в построении и реализации маркетинговых стратегий в нишах: fashion и масс-маркет одежды, event-индустрия, ресторанный бизнес, туризм, спорт, фитнес, сфера красоты и др.',
    tags: ['#маркетинг', '#продвижение', '#стратегия'],
  },
];

function shortDescription(value, limit = 158) {
  const normalized = value.replace(/\s+/g, ' ').trim();
  return normalized.length <= limit ? normalized : `${normalized.slice(0, limit - 1).trimEnd()}…`;
}

function createCourse({ id, sourceCourseId = null, sourceUrl = null, sourceWarning = null, authorId, authorName, title, description, objectives = [], cover, price = null, tags = [], duration = null, lessons = [], materials = [], progress = null, keywords = [] }) {
  const canonical = `${SITE_URL}/catalog/course/${id}`;
  return {
    id, sourceCourseId, sourceUrl, sourceWarning, authorId, title, description, objectives, cover, price, tags,
    duration, lessons, materials, progress, likes: null, saves: null,
    seo: {
      title: `${title} — ${authorName} | AskHow`, description: shortDescription(description), canonical,
      image: cover.startsWith('http') ? cover : `${SITE_URL}${cover}`, robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      keywords: [...new Set([title, authorName, ...keywords, ...tags.map((tag) => tag.replace(/^#/, '')), 'онлайн-курс', 'AskHow'])],
    },
  };
}

export const courses = [
  createCourse({
    id: 'brand-publicity-media-reputation', sourceCourseId: '35db89020d42', sourceUrl: 'https://app.askhow.ru/?c=MzVkYjg5MDIwZDQy',
    authorId: 'igor-malinin', authorName: 'Игорь Малинин',
    title: 'Как бизнесу нарастить свою публичность: от попадания в СМИ до развития интернет-репутации',
    description: 'Публичность бренда — это не просто «хотелка» собственника или маркетолога. Это реально работающий бизнес-инструмент, способный обеспечить прямые продажи, добавочную стоимость, RTB, новые бизнес-направления и новые партнёрства. Тем не менее, есть много компаний, которые выстраивают ошибочную медиастратегию и обжигаются на рынке PR и SERM (репутационный менеджмент).',
    objectives: ['Использовать публичность для прямых продаж', 'Повышать добавочную стоимость бренда', 'Разобраться в PR, СМИ и SERM', 'Избегать ошибок при построении медиастратегии'],
    cover: '/images/authors/igor-malinin/media/cover.jpg',
    duration: '45 мин 41 сек', price: '3 000 ₽', lessons: igorMalininLessons,
    tags: ['#PR', '#СМИ', '#SERM'],
  }),
  createCourse({
    id: 'business-hypotheses-intro', sourceCourseId: '0bc9d4a8453e', sourceUrl: 'https://app.askhow.ru/?c=MGJjOWQ0YTg0NTNl',
    authorId: 'pavel-semenov', authorName: 'Павел Семенов', title: 'Вводный курс про гипотезы',
    description: 'На курсе вы узнаете, как ставить гипотезы в своём бизнесе, почему благодаря им можно быстрее расти и как выбирать гипотезу, которую лучше всего проверить первой.',
    objectives: ['Перекладывать идеи в понятные для команды гипотезы', 'Формулировать гипотезы однозначно и без длинных описаний', 'Понимать, на какие финансовые метрики направлены действия', 'Выбирать лучшие гипотезы, опираясь на цифры, а не на ощущения'],
    cover: '/images/authors/pavel-semenov/media/cover.jpg', tags: ['#гипотезы', '#бизнес', '#метрики'],
  }),
  createCourse({
    id: 'strategic-storytelling-interviews', sourceCourseId: '4d2c45930d80', sourceUrl: 'https://app.askhow.ru/?c=NGQyYzQ1OTMwZDgw',
    authorId: 'artem-mushin', authorName: 'Артём Мушин-Македонский', title: 'Стратегический сторителлинг для собеседований и интервью',
    description: 'Превратить повседневные события из жизни в истории, которые помогут создать отличное первое впечатление на интервью и вдохновить собеседника пригласить вас на следующий этап отбора.',
    objectives: ['Понимать, за счёт чего истории влияют на решения людей', 'Выстраивать истории с очевидным и полезным выводом', 'Выбирать подходящие истории для интервью', 'Превращать профессиональный опыт в запоминающийся рассказ'],
    cover: '/images/authors/artem-mushin/media/cover.jpg',
    duration: '1 ч 39 мин 30 сек', price: '2 000 ₽', lessons: artemMushinLessons,
    tags: ['#сторителлинг', '#собеседование', '#интервью'],
  }),
  createCourse({
    id: 'tax-system-selection', sourceCourseId: '0412c9a76e17', sourceUrl: 'https://app.askhow.ru/?c=MDQxMmM5YTc2ZTE3',
    authorId: 'yulia-volkova', authorName: 'Юлия Александровна Волкова', title: 'Как выбрать систему налогообложения: отчётность и сроки сдачи',
    description: 'Курс поможет определиться с системой налогообл-я, формой владения бизнеса. Расскажу о нюнасах ведения каждой -какие отчеты сдаются в заисимости от каждой СНО, а так же сроки и сдачи отчетов. каие этапы в процессе открытия нужно соблюсти для комофртной дальнейшей деятельности.',
    objectives: ['Выбрать подходящую систему налогообложения', 'Определиться с формой ведения бизнеса', 'Разобраться в составе отчётности', 'Соблюдать сроки и этапы открытия бизнеса'],
    cover: '/images/authors/yulia-volkova/tax-system-selection.jpg',
    duration: '1 ч 26 мин 37 сек', price: '1 490 ₽', lessons: yuliaVolkovaLessons,
    tags: ['#налоги', '#отчётность', '#предпринимательство'],
  }),
  createCourse({
    id: 'selling-resume', sourceCourseId: 'd58a51537a04', sourceUrl: 'https://app.askhow.ru/?c=ZDU4YTE1NTM3YTA0',
    authorId: 'alexandra-nikitina', authorName: 'Александра Никитина', title: 'Создание продающего резюме: твой путь к работе мечты',
    description: 'Курс «Создание продающего резюме» предназначен для тех, кто хочет выделиться на фоне конкурентов и привлечь внимание работодателей. В ходе обучения вы узнаете, как правильно структурировать резюме, какие ключевые слова использовать, чтобы пройти автоматические системы отбора, и как подчеркнуть свои достижения и навыки. Мы рассмотрим примеры успешных резюме и разберем, что именно делает их привлекательными для работодателя.',
    objectives: ['Правильно структурировать резюме', 'Подбирать ключевые слова для систем автоматического отбора', 'Показывать достижения и профессиональные навыки', 'Адаптировать резюме под конкретную вакансию'],
    cover: '/images/authors/alexandra-nikitina/selling-resume.jpg', duration: '1 ч 26 мин 46 сек', price: '990 ₽', lessons: resumeLessons, tags: ['#карьера', '#резюме', '#поискработы'],
  }),
  createCourse({
    id: 'buyer-states-sales', sourceCourseId: '4164e51959fe', sourceUrl: 'https://app.askhow.ru/?c=NDE2NGU1MTk1OWZl',
    authorId: 'konstantin-kharsky', authorName: 'Константин Харский', title: 'Управление покупательскими состояниями. Продажи по-новому',
    description: 'Всё меняется. Что-то уходит в прошлое, что-то приходит на смену. Мы предлагаем новый, оригинальный взгляд на продажи. Мы поняли в каком состоянии должен находиться покупатель, чтобы сказать: «Беру». Мы можем научить продавца, как приводить покупателя в это заветное состояние. Попробуйте новый подход к продажам.',
    objectives: ['Понимать состояния покупателя', 'Определять готовность клиента к покупке', 'Управлять ходом продажи по-новому', 'Приводить покупателя к решению «Беру»'],
    cover: 'https://bestspeakers.ru/wp-content/uploads/2022/01/Luchshie-spikery-Konstantin-Harskij-800x600.jpg', tags: ['#продажи', '#покупатель', '#переговоры'],
  }),
  createCourse({
    id: 'effective-self-presentation', sourceCourseId: 'afd2ffefbc25', sourceUrl: 'https://app.askhow.ru/?c=YWZkMmZmZWZiYzI1',
    authorId: 'alexey-markov', authorName: 'Алексей Марков', title: 'Эффективная самопрезентация. Как уверенно говорить о себе в публичном пространстве',
    description: 'На этом курсе вы освоите техники самопрезентации и уверенного выступления, научитесь выстраивать структуру рассказа о себе и формировать профессиональный образ. 10 коротких уроков, и вы навсегда избавитесь от неловкости при представлении себя: будете точно знать, что говорить с учетом контекста и как подавать себя так, чтобы звучать статусно и интересно.',
    objectives: ['Уверенно представлять себя в разных ситуациях', 'Структурировать рассказ о себе', 'Формировать профессиональный образ', 'Адаптировать самопрезентацию под контекст'],
    cover: '/images/authors/alexey-markov/effective-self-presentation.jpg',
    duration: '45 мин 28 сек', price: '2 900 ₽', lessons: alexeyMarkovLessons,
    tags: ['#самопрезентация', '#выступления', '#личныйбренд'],
  }),
  createCourse({
    id: 'breathing-and-voice', sourceCourseId: 'bc6f8a373a12', sourceUrl: 'https://app.askhow.ru/?c=YmM2ZjhhMzczYTEy',
    authorId: 'alexey-markov', authorName: 'Алексей Марков', title: 'Дыхание и голос: основы публичных выступлений',
    description: 'Этот курс научит вас всему, что нужно знать о правильном дыхании и голосе для публичных выступлений: основы диафрагмального дыхания и его преимущества, как правильно дышать и создавать опору для звука, дыхательная гимнастика для улучшения голоса и контроля дыхания.',
    objectives: ['Освоить диафрагмальное дыхание', 'Создавать опору для звука', 'Контролировать дыхание во время выступления', 'Использовать дыхательную гимнастику для улучшения голоса'],
    cover: '/images/authors/alexey-markov/author.jpg', tags: ['#дыхание', '#голос', '#выступления'],
  }),
  createCourse({
    id: 'voice-resonators', sourceCourseId: 'fedbfce6bb80', sourceUrl: 'https://app.askhow.ru/?c=ZmVkYmZjZTZiYjgw',
    authorId: 'alexey-markov', authorName: 'Алексей Марков', title: 'Развитие голоса и резонаторов: «шаманские практики» и техники',
    description: 'Как сделать голос красивым? Этот курс направлен на развитие и улучшение вашего голоса через «шаманские практики» и техники работы с резонаторами, которые актеры уже используют сотни лет. Вы услышите свой настоящий голос и узнаете, как работают ваши резонаторы, как правильно направлять голос, чтобы он звучал увереннее, и как включить голос перед важной встречей или выступлением. Здесь самые быстрые практические упражнения для изменения вашего звучания.',
    objectives: ['Понять, как работают резонаторы', 'Направлять голос и звучать увереннее', 'Подготавливать голос перед встречей или выступлением', 'Оценивать изменение звучания с помощью записи на диктофон'],
    cover: '/images/authors/alexey-markov/author.jpg', tags: ['#голос', '#резонаторы', '#актёрскиетехники'],
  }),
  createCourse({
    id: 'easy-finance-management', sourceCourseId: '388b3f80e33d', sourceUrl: 'https://app.askhow.ru/?c=Mzg4YjNmODBlMzNk',
    authorId: 'igor-veretennikov', authorName: 'Игорь Веретенников', title: 'Лёгкие финансы: мастерство финансового управления',
    description: 'Курс «Легкие финансы» предлагает практический подход к финансовому управлению, основанный на анализе реальных бизнес-кейсов и работе с ключевыми финансовыми отчетами. Участники курса научатся делать бизнес измеримым и прогнозируемым, повышая его эффективность и стабильность. Курс рассчитан на предпринимателей, финансистов и наемных сотрудников, стремящихся к карьерному росту в финансовой сфере.',
    objectives: ['Работать с ключевыми финансовыми отчётами', 'Анализировать реальные бизнес-кейсы', 'Делать бизнес измеримым и прогнозируемым', 'Повышать эффективность и финансовую стабильность'],
    cover: '/images/authors/igor-veretennikov/media/cover.jpg', tags: ['#финансы', '#отчётность', '#управление'],
  }),
  createCourse({
    id: 'word-of-mouth-promotion', sourceCourseId: '8868c532dc4b', sourceUrl: 'https://app.askhow.ru/?a=ODg2OGM1MzJkYzRi',
    authorId: 'darya-filimonova', authorName: 'Дарья Филимонова', title: 'Бесплатное продвижение: сарафанное радио',
    description: 'Бесплатное продвижение: сарафанное радио. Курс Дарьи Филимоновой — маркетолога-аналитика и стратега с опытом >15 лет в построении и реализации маркетинговых стратегий.',
    objectives: ['Понять механику сарафанного радио', 'Создавать причины для рекомендаций', 'Запускать продвижение без рекламного бюджета', 'Использовать опыт из разных отраслей'],
    cover: '/images/authors/darya-filimonova/media/cover.jpg', price: 'Бесплатно', tags: ['#маркетинг', '#продвижение', '#рекомендации'],
  }),
];

export const authors = authorsBase.map((author) => {
  const authorCourses = courses.filter((course) => course.authorId === author.id);
  const canonical = `${SITE_URL}/catalog/author/${author.id}`;
  const image = author.avatar.startsWith('http') ? author.avatar : `${SITE_URL}${author.avatar}`;
  return {
    ...author, students: null, courses: authorCourses.length, course: authorCourses[0] || null,
    seo: {
      title: `${author.name} — курсы автора | AskHow`,
      description: shortDescription(`${author.description} Курсы автора на платформе AskHow.`),
      canonical, image, robots: 'index, follow, max-image-preview:large, max-snippet:-1',
      keywords: [...new Set([author.name, author.role, ...author.tags.map((tag) => tag.replace(/^#/, '')), 'автор AskHow'])],
    },
    content: { courses: authorCourses, videos: [], articles: [] },
  };
});
