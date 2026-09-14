export const SITE_NAME = 'AskHow';
export const SITE_URL = 'https://app.askhow.ru';
export const SITE_LOCALE = 'ru_RU';
export const SITE_LANGUAGE = 'ru-RU';

export const SITE_CONTACTS = {
  email: 'info@askhow.ru',
  phone: '+7-929-734-55-00',
};

export function absoluteUrl(path = '') {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
