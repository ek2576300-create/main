import { blogs } from '../../data/blogs.js';
import { authors, courses } from '../../data/catalog.js';
import { subscriptionCourses } from '../../data/subscriptions.js';

const authorById = new Map(authors.map((author) => [author.id, author]));

const TYPE_PRIORITY = {
  subscription: 4,
  course: 3,
  author: 2,
  blog: 1,
};

const FIELD_LABELS = {
  title: 'По названию',
  author: 'По автору',
  category: 'По категории',
  keywords: 'По ключевым словам',
  description: 'По описанию',
};

const FIELD_WEIGHTS = {
  title: 3.4,
  author: 2.4,
  category: 2.1,
  keywords: 2.5,
  description: 0.9,
};

const ALIASES = new Map([
  ['маркетинг', ['реклама', 'продвижение', 'трафик', 'директ', 'маркетолог']],
  ['маркетолог', ['маркетинг', 'реклама', 'продвижение', 'трафик']],
  ['реклама', ['маркетинг', 'продвижение', 'трафик', 'директ', 'маркетолог']],
  ['продвижение', ['маркетинг', 'реклама', 'трафик', 'маркетолог']],
  ['трафик', ['маркетинг', 'реклама', 'директ']],
  ['директ', ['яндекс', 'реклама', 'трафик', 'маркетинг']],
  ['налог', ['налоги', 'фнс', 'усн', 'ндс']],
  ['налоги', ['налог', 'фнс', 'усн', 'ндс']],
  ['фнс', ['налог', 'налоги', 'доначисления']],
  ['усн', ['упрощенка', 'налог', 'ндс']],
  ['ндс', ['налог', 'усн', 'ставка']],
  ['банк', ['счет', 'финмониторинг', '115фз']],
  ['счет', ['банк', 'расчетный', 'финмониторинг', '115фз']],
  ['115фз', ['банк', 'счет', 'финмониторинг', 'блокировка']],
  ['гпх', ['договор', 'фрилансер', 'самозанятый']],
  ['договор', ['гпх', 'контракт', 'соглашение']],
  ['кадры', ['hr', 'сотрудник', 'гит', 'увольнение']],
  ['hr', ['кадры', 'сотрудник', 'увольнение']],
  ['увольнение', ['кадры', 'сотрудник', 'прогул', 'hr']],
  ['гит', ['трудовая', 'инспекция', 'кадры', 'проверка']],
  ['касса', ['чек', 'фискальный', 'фн']],
  ['чек', ['касса', 'фискальный', 'фн']],
  ['бренд', ['товарный', 'знак', 'логотип', 'фипс']],
  ['фипс', ['товарный', 'знак', 'бренд', 'логотип']],
  ['romi', ['маркетолог', 'маркетинг', 'реклама', 'kpi']],
  ['cpl', ['маркетолог', 'маркетинг', 'реклама', 'kpi']],
  ['kpi', ['маркетолог', 'маркетинг', 'romi', 'cpl']],
  ['marketing', ['маркетинг', 'реклама', 'продвижение']],
  ['business', ['бизнес', 'ип', 'предприниматель']],
  ['tax', ['налог', 'налоги', 'фнс']],
  ['nds', ['ндс']],
  ['usn', ['усн']],
  ['gph', ['гпх', 'договор']],
]);


const STOP_WORDS = new Set([
  'как',
  'по',
  'про',
  'для',
  'и',
  'или',
  'в',
  'во',
  'на',
  'с',
  'со',
  'о',
  'об',
  'от',
  'до',
  'курс',
  'курсы',
  'обучение',
  'урок',
]);

const EN_LAYOUT = "qwertyuiop[]asdfghjkl;'zxcvbnm,.`";
const RU_LAYOUT = 'йцукенгшщзхъфывапролджэячсмитьбюё';
const EN_TO_RU = new Map([...EN_LAYOUT].map((char, index) => [char, RU_LAYOUT[index]]));
const RU_TO_EN = new Map([...RU_LAYOUT].map((char, index) => [char, EN_LAYOUT[index]]));

function normalizeText(value = '') {
  return String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/115\s*[-–—]?\s*фз/g, '115фз')
    .replace(/[^a-zа-я0-9%]+/gi, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function swapKeyboardLayout(value) {
  return [...value]
    .map((char) => EN_TO_RU.get(char) || RU_TO_EN.get(char) || char)
    .join('');
}

function stemWord(word) {
  if (word.length <= 4 || /\d/.test(word)) return word;

  return word.replace(
    /(иями|ями|ами|ого|ему|ому|ыми|ими|иях|ах|ях|ов|ев|ей|ом|ем|ам|ям|ую|юю|ая|яя|ое|ее|ые|ие|ый|ий|ой|ым|им|ых|их|а|я|ы|и|у|ю|е)$/,
    '',
  );
}

function boundedLevenshtein(left, right, maxDistance) {
  if (left === right) return 0;
  if (Math.abs(left.length - right.length) > maxDistance) return maxDistance + 1;

  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);

  for (let row = 1; row <= left.length; row += 1) {
    const current = [row];
    let rowMin = current[0];

    for (let col = 1; col <= right.length; col += 1) {
      const cost = left[row - 1] === right[col - 1] ? 0 : 1;
      const value = Math.min(
        previous[col] + 1,
        current[col - 1] + 1,
        previous[col - 1] + cost,
      );
      current[col] = value;
      rowMin = Math.min(rowMin, value);
    }

    if (rowMin > maxDistance) return maxDistance + 1;
    previous = current;
  }

  return previous[right.length];
}

function fuzzyWordScore(queryWord, candidateWord) {
  if (!queryWord || !candidateWord) return 0;
  if (queryWord === candidateWord) return 60;
  if (queryWord.length >= 2 && candidateWord.startsWith(queryWord)) return 46;
  if (candidateWord.length >= 3 && queryWord.startsWith(candidateWord)) return 42;
  if (queryWord.length >= 3 && candidateWord.includes(queryWord)) return 34;
  if (candidateWord.length >= 3 && queryWord.includes(candidateWord)) return 32;

  const queryStem = stemWord(queryWord);
  const candidateStem = stemWord(candidateWord);
  if (queryStem.length >= 3 && queryStem === candidateStem) return 43;
  if (queryStem.length >= 5 && candidateStem.length >= 5) {
    const shorter = Math.min(queryStem.length, candidateStem.length);
    const longer = Math.max(queryStem.length, candidateStem.length);
    if (
      shorter / longer >= 0.7 &&
      (candidateStem.startsWith(queryStem) || queryStem.startsWith(candidateStem))
    ) {
      return 38;
    }
  }

  if (queryWord.length < 4 || candidateWord.length < 4) return 0;
  const maxDistance = queryWord.length >= 8 ? 2 : 1;
  const distance = boundedLevenshtein(queryWord, candidateWord, maxDistance);
  if (distance > maxDistance) return 0;

  return distance === 1 ? 30 : 21;
}

function expandTerm(term) {
  const normalized = normalizeText(term);
  const aliases = /\d/.test(normalized) ? [] : ALIASES.get(normalized) || [];
  const seen = new Set();
  const variants = [];

  const push = (value, multiplier) => {
    const normalizedValue = normalizeText(value);
    if (!normalizedValue || seen.has(normalizedValue)) return;
    seen.add(normalizedValue);
    variants.push({ value: normalizedValue, multiplier });
  };

  push(normalized, 1);
  aliases.forEach((alias) => push(alias, 0.58));
  return variants;
}

function buildQueryVariants(query) {
  const normalized = normalizeText(query);
  if (!normalized) return [];

  const swapped = normalizeText(swapKeyboardLayout(normalized));
  return [...new Set([normalized, swapped].filter((value) => value.length >= 2))];
}

function createField(name, value) {
  const text = normalizeText(Array.isArray(value) ? value.join(' ') : value);
  return {
    name,
    text,
    words: text.split(' ').filter(Boolean),
  };
}

function scoreField(field, query, terms) {
  if (!field.text) return { score: 0, coverage: new Set() };

  const weight = FIELD_WEIGHTS[field.name] || 1;
  let score = 0;
  const coverage = new Set();

  if (field.text === query) score += 145 * weight;
  else if (field.text.startsWith(query)) score += 105 * weight;
  else if (field.text.includes(query)) score += 78 * weight;

  terms.forEach((term, termIndex) => {
    const variants = expandTerm(term);
    let best = 0;

    for (const variant of variants) {
      for (const word of field.words) {
        best = Math.max(best, fuzzyWordScore(variant.value, word) * variant.multiplier);
        if (best === 60) break;
      }
      if (best === 60) break;
    }

    if (best > 0) {
      coverage.add(termIndex);
      score += best * weight;
    }
  });

  return { score, coverage };
}

function tokenizeQuery(queryVariant) {
  const allTerms = queryVariant.split(' ').filter(Boolean);
  const meaningfulTerms = allTerms.filter((term) => !STOP_WORDS.has(term));
  return meaningfulTerms.length ? meaningfulTerms : allTerms;
}

function scoreEntry(entry, queryVariant) {
  const terms = tokenizeQuery(queryVariant);
  if (!terms.length) return null;

  let score = 0;
  const totalCoverage = new Set();
  let bestField = null;
  let bestFieldScore = 0;

  for (const field of entry.fields) {
    const fieldScore = scoreField(field, queryVariant, terms);
    score += fieldScore.score;
    fieldScore.coverage.forEach((index) => totalCoverage.add(index));

    if (fieldScore.score > bestFieldScore) {
      bestFieldScore = fieldScore.score;
      bestField = field.name;
    }
  }

  const coverageRatio = totalCoverage.size / terms.length;
  const minimumCoverage = terms.length <= 2 ? 1 : 0.66;
  if (coverageRatio < minimumCoverage || score < 36) return null;

  score *= 0.72 + coverageRatio * 0.28;
  if (bestField === 'title') score += 22;
  if (entry.type === 'subscription' || entry.type === 'course') score += 4;

  return {
    score,
    matchLabel: FIELD_LABELS[bestField] || 'По совпадению',
  };
}

function buildSearchIndex() {
  const subscriptionEntries = subscriptionCourses.map((course) => ({
    type: 'subscription',
    id: course.id,
    title: course.title,
    subtitle: course.category || 'Курс по подписке',
    image: course.image,
    url: course.url,
    fields: [
      createField('title', [course.title, course.subtitle]),
      createField('category', course.category),
      createField('keywords', course.keywords || []),
      createField('description', course.description),
    ],
  }));

  const courseEntries = courses.map((course) => {
    const author = authorById.get(course.authorId);
    const duplicatedKeywords = new Set(
      [course.title, author?.name, 'онлайн-курс', 'AskHow'].map(normalizeText),
    );
    const keywords = [...(course.tags || []), ...(course.seo?.keywords || [])].filter(
      (keyword) => !duplicatedKeywords.has(normalizeText(keyword)),
    );

    return {
      type: 'course',
      id: course.id,
      title: course.title,
      subtitle: author?.name || 'Курс AskHow',
      image: course.cover,
      fields: [
        createField('title', course.title),
        createField('author', [author?.name, author?.role]),
        createField('keywords', keywords),
        createField('description', course.description),
      ],
    };
  });

  const authorEntries = authors.map((author) => ({
    type: 'author',
    id: author.id,
    title: author.name,
    subtitle: author.role,
    image: author.avatar,
    fields: [
      createField('title', author.name),
      createField('category', author.role),
      createField('keywords', author.tags || []),
      createField('description', author.description),
    ],
  }));

  const blogEntries = blogs.map((blog) => ({
    type: 'blog',
    id: blog.id,
    title: blog.title,
    subtitle: blog.category,
    image: blog.image,
    fields: [
      createField('title', blog.title),
      createField('author', blog.author),
      createField('category', blog.category),
      createField('keywords', blog.tags),
      createField('description', blog.excerpt),
    ],
  }));

  return [...subscriptionEntries, ...courseEntries, ...authorEntries, ...blogEntries];
}

const SEARCH_INDEX = buildSearchIndex();

export function searchSite(query, limit = 9) {
  const variants = buildQueryVariants(query);
  if (!variants.length) return [];

  const results = SEARCH_INDEX.map((entry) => {
    let bestMatch = null;
    let matchedVariant = null;

    for (const variant of variants) {
      const match = scoreEntry(entry, variant);
      if (match && (!bestMatch || match.score > bestMatch.score)) {
        bestMatch = match;
        matchedVariant = variant;
      }
    }

    if (!bestMatch) return null;

    return {
      type: entry.type,
      id: entry.id,
      title: entry.title,
      subtitle: entry.subtitle,
      image: entry.image,
      url: entry.url,
      score: bestMatch.score,
      matchLabel: bestMatch.matchLabel,
      correctedLayout: matchedVariant !== variants[0],
    };
  })
    .filter(Boolean)
    .sort((left, right) => {
      if (Math.abs(right.score - left.score) > 0.001) return right.score - left.score;
      return (TYPE_PRIORITY[right.type] || 0) - (TYPE_PRIORITY[left.type] || 0);
    })
    .slice(0, limit)
    .map(({ score: _score, ...result }) => result);

  return results;
}

