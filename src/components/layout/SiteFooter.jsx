import { MessageCircle, Send } from 'lucide-react';
import { useAppContext } from '../../app/AppContext';
import { CookieConsent } from './CookieConsent';

const TELEGRAM_URL = 'https://t.me/+J1XU4RVIVQM1NjBi';
const MAX_URL = 'https://max.ru/join/Ylp_WbRcr8wnnJBmtBFfB6FpT9b_rh0VIV2o9byrtbc';

const SOCIAL_LINKS = [
  { key: 'tg', label: 'Telegram', href: TELEGRAM_URL, icon: Send },
  { key: 'wa', label: 'WhatsApp', href: '#contacts', icon: MessageCircle },
];

const BANK_SERVICES = [
  { label: 'Альфа-Клик', src: '/images/payments/alfa-bank.webp' },
  { label: 'Тинькофф Банк', src: '/images/payments/tinkoff.png' },
  { label: 'Русский Стандарт', src: '/images/payments/russian-standard.webp' },
  { label: 'Промсвязьбанк', src: '/images/payments/psb.png' },
  { label: 'Почта Банк', src: '/images/payments/pochta-bank.png' },
  { label: 'Faktura.ru', src: '/images/payments/faktura.png' },
];

const PAYMENT_NETWORKS = [
  { label: 'Visa', src: '/images/payments/visa.png' },
  { label: 'Mastercard', src: '/images/payments/mastercard.png' },
  { label: 'МИР', src: '/images/payments/mir.png' },
];

function CardBadges() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {PAYMENT_NETWORKS.map((network) => (
        <img key={network.label} src={network.src} alt={network.label} className="h-6 w-auto object-contain" />
      ))}
    </div>
  );
}

export function SiteFooter() {
  const { courseCta } = useAppContext();

  return (
    <footer className="footer-motion border-t border-[#f0f0f0] bg-white px-3 pb-8 pt-9 min-[380px]:px-4 sm:px-5 sm:pt-10 lg:ml-[190px] lg:px-[28px]">
      <div className="mx-auto max-w-[1050px]">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.35fr_1fr_1fr]">
          <div>
            <div className="text-[25px] font-black tracking-[-1.8px]"><svg xmlns="http://www.w3.org/2000/svg" width="129" height="25" viewBox="0 0 129 25" fill="none">
<path d="M105.469 24.6313C101.273 24.4761 98.7738 21.93 97.5805 18.2025C96.4968 14.8172 96.3193 11.3236 96.3635 7.81174C96.3674 7.49356 96.7719 7.03668 97.1 6.89207C98.29 6.36769 99.5283 6.42096 100.747 6.86305C101.314 7.06857 101.495 7.46512 101.495 8.0755C101.494 10.5345 101.497 12.9959 101.612 15.4512C101.651 16.2965 101.96 17.1495 102.257 17.9583C102.864 19.61 104.115 20.4828 105.739 20.4957C107.428 20.5092 108.602 19.7237 109.294 18.0688C110.187 15.9313 110.217 13.6687 110.201 11.4059C110.193 10.3051 110.18 9.20208 110.101 8.10497C110.046 7.34786 110.4 6.86758 111.064 6.79669C112.083 6.68783 113.127 6.67924 114.15 6.76308C114.944 6.82825 115.281 7.34311 115.275 8.21315C115.258 10.6997 115.246 13.1938 115.429 15.6706C115.506 16.726 115.909 17.8399 116.447 18.7633C117.876 21.2172 121.335 21.098 122.737 18.6275C123.686 16.9562 123.869 15.109 123.907 13.2512C123.941 11.6018 123.895 9.94751 123.8 8.30017C123.754 7.49504 124.043 7.02188 124.774 6.78703C125.917 6.41985 127.062 6.43633 128.193 6.83828C128.693 7.01626 129.003 7.32364 128.999 7.92808C128.976 11.4418 128.846 14.9433 127.711 18.3142C126.695 21.3352 124.937 23.7039 121.623 24.3842C118.334 25.0595 115.386 24.4332 113.176 21.6566C113.087 21.5447 112.98 21.444 112.869 21.3532C112.807 21.3021 112.719 21.282 112.544 21.204C110.872 23.6328 108.46 24.6552 105.469 24.6313Z" fill="black"/>
<path d="M56.1583 13.1799C56.1538 9.35492 56.1488 5.61694 56.145 1.87896C56.1439 0.797532 56.4222 0.409876 57.4574 0.157362C57.8765 0.0551355 58.3193 -0.00923415 58.7491 0.00108095C60.8769 0.0521252 61.4019 0.605905 61.3271 2.69634C61.2858 3.85377 61.2242 5.01074 61.1534 6.16679C61.109 6.89201 61.3158 7.07299 62.113 6.97416C63.8279 6.76155 65.6012 6.47104 67.2883 6.69001C71.67 7.25872 74.5203 10.59 74.7183 15.0991C74.8327 17.7034 74.8218 20.3131 74.9167 22.9186C74.9483 23.7875 74.5566 24.2089 73.773 24.3789C73.3482 24.471 72.9243 24.5883 72.4939 24.629C70.5013 24.8174 69.6976 24.035 69.7596 22.0514C69.8274 19.8796 69.8854 17.7071 69.9062 15.5345C69.9436 11.617 68.1141 10.1058 63.9392 10.7809C62.0571 11.0853 61.0378 12.5501 61.0016 14.927C60.9711 16.9248 61.0522 18.9244 61.0881 20.9232C61.0944 21.2707 61.1264 21.6176 61.1382 21.9651C61.21 24.0842 60.2728 24.9103 58.1295 24.605C57.7869 24.5562 57.453 24.4486 57.1136 24.3754C56.271 24.1936 55.949 23.71 55.9762 22.8229C56.0736 19.6387 56.103 16.4524 56.1583 13.1799Z" fill="black"/>
<path d="M52.7523 9.31583C50.9437 11.2045 49.1941 13.0644 47.4022 14.8828C46.8104 15.4833 46.7741 15.9245 47.3872 16.5455C49.4663 18.6512 51.5083 20.7937 53.5425 22.9429C53.8181 23.2341 53.9683 23.6436 54.1766 23.9983C53.7704 24.09 53.3644 24.2602 52.9578 24.2615C48.6099 24.2754 49.3495 24.5801 46.2931 21.5291C45.3697 20.6073 44.472 19.6599 43.554 18.7326C43.3153 18.4915 43.0443 18.2822 42.6213 17.9126C42.5269 18.3842 42.4121 18.6896 42.4141 18.9942C42.4229 20.3274 42.4406 21.6615 42.5058 22.9928C42.5419 23.7306 42.2125 24.1181 41.5448 24.3324C40.52 24.6613 39.508 24.6957 38.4652 24.3922C37.6597 24.1577 37.3 23.7547 37.3108 22.8467C37.3754 17.4278 37.3845 12.0082 37.3966 6.58874C37.4002 4.96608 37.383 3.34214 37.3179 1.72108C37.2854 0.909248 37.6488 0.48648 38.3747 0.255313C39.4354 -0.0824453 40.481 -0.0641405 41.535 0.290579C42.2367 0.526764 42.5236 0.955982 42.5059 1.72011C42.4241 5.25506 42.3828 8.79104 42.3478 12.3269C42.3447 12.6462 42.4902 12.967 42.5667 13.2871C42.8826 13.1232 43.262 13.0235 43.5039 12.7849C44.9909 11.318 46.4544 9.82697 47.91 8.32888C48.6359 7.58185 49.492 7.17917 50.5394 7.18155C51.4981 7.18373 52.4574 7.1533 53.4149 7.18366C53.6714 7.1918 53.9224 7.36968 54.1759 7.46963C54.0609 7.71813 53.9898 8.00267 53.8214 8.20734C53.5092 8.5865 53.1401 8.91896 52.7523 9.31583Z" fill="black"/>
<path d="M2.42179 22.2127C-1.17993 18.0146 -0.698995 11.5234 3.42965 8.36371C5.57565 6.72137 8.06177 6.26323 10.6797 6.62459C12.923 6.93424 15.1452 7.31443 17.4274 7.09228C18.3637 7.00115 18.7653 7.59043 18.7152 8.70336C18.6123 10.9873 18.4522 13.2718 18.4506 15.5561C18.449 17.8694 18.5901 20.1838 18.7072 22.4958C18.7863 24.0564 18.4574 24.3011 16.9034 24.3552C14.7704 24.4295 12.6421 24.6784 10.5156 24.8904C7.4359 25.1975 4.70892 24.4732 2.42179 22.2127ZM13.4015 12.4133C11.9312 10.479 8.11237 9.93963 6.15927 11.4861C5.58432 11.9413 4.99515 12.6657 4.87644 13.3472C4.63739 14.7195 4.59456 16.156 4.69699 17.5495C4.81823 19.1989 5.88669 20.216 7.46468 20.6352C8.86905 21.0084 10.2803 20.9673 11.6608 20.4674C12.6493 20.1095 13.3803 19.4392 13.6904 18.4533C14.3157 16.4653 14.3822 14.4699 13.4015 12.4133Z" fill="black"/>
<path d="M91.5859 8.21674C96.6704 12.2312 96.3285 20.4049 90.9462 23.634C86.7171 26.1711 79.9514 25.2848 77.5266 20.0426C75.0096 14.6009 77.4734 6.76202 85.5131 6.52943C87.7007 6.46615 89.7116 6.96332 91.5859 8.21674ZM82.8832 20.1441C84.6023 21.0765 86.3895 21.0617 88.1929 20.4689C89.3861 20.0767 90.2213 19.2278 90.3978 17.9991C90.5811 16.7237 90.6572 15.4008 90.5344 14.1221C90.3911 12.629 89.6192 11.4273 88.0732 10.9508C86.7154 10.5323 85.336 10.4985 83.9503 10.8654C82.6633 11.2062 81.7911 12.0121 81.4126 13.2586C80.9135 14.9021 80.881 16.6006 81.4412 18.2205C81.6798 18.9105 82.3165 19.4635 82.8832 20.1441Z" fill="black"/>
<path d="M24.2002 18.4086C20.1712 17.0306 20.0632 11.933 23.0821 9.87623C24.1944 9.11847 25.4657 8.5843 26.6904 8.00266C27.631 7.55597 28.6138 7.19818 29.575 6.79423C30.1756 6.54186 30.6932 6.15558 30.557 5.44046C30.41 4.66808 29.6935 4.70751 29.0917 4.6455C27.0446 4.4345 25.2969 5.29156 23.5676 6.20037C22.5414 6.73961 21.8066 6.57074 21.1183 5.60649C20.3959 4.59454 20.4578 3.90334 21.3436 3.08887C24.1964 0.465886 29.2329 -0.309054 32.4958 1.37295C35.3915 2.86575 36.0483 6.7367 33.6918 9.00077C32.8564 9.80342 31.7701 10.3798 30.7274 10.924C29.7826 11.4171 28.7336 11.7077 27.7453 12.1227C27.1601 12.3684 26.5523 12.6146 26.0538 12.9912C25.7582 13.2145 25.4605 13.73 25.522 14.0443C25.5815 14.3487 26.0668 14.715 26.4222 14.7922C28.1515 15.1678 29.7484 14.6475 31.2858 13.8978C31.7543 13.6693 32.2028 13.4004 32.6678 13.1644C33.5579 12.7127 34.3145 12.986 35.0176 14.0008C35.6129 14.8599 35.5799 15.5789 34.8717 16.2419C31.786 19.1305 28.1806 19.5344 24.2002 18.4086Z" fill="black"/>
<path d="M26.4822 23.7663C25.5018 21.9876 26.2876 20.5827 28.2533 20.474C29.8528 20.3855 30.9439 21.1139 31.0195 22.3209C31.0782 23.2579 30.6395 23.9731 29.7444 24.2525C28.6159 24.6047 27.5141 24.5768 26.4822 23.7663Z" fill="black"/>
</svg></div>
            <p className="mt-5 max-w-[430px] text-[9px] leading-[1.35] text-[#666]">
              ООО «АСКХАУ» осуществляет деятельность в области IT — разработка платформы коротких
              обучающих вертикальных видео. Платформа ориентирована на образовательный контент и
              использует российские серверы и технологии.
            </p>
            <p className="mt-5 max-w-[430px] text-[8px] leading-[1.5] text-[#999]">
              PayAnyWay не передаёт данные Вашей карты магазину и иным третьим лицам. Безопасность
              платежей с помощью банковских карт обеспечивается технологией защищённого соединения
              HTTPS и двухфакторной аутентификации пользователя 3D Secure. В соответствии с ФЗ «О
              защите прав потребителей» в случае, если Вам оказана услуга или реализован товар
              ненадлежащего качества, платёж может быть возвращён на банковскую карту, с которой
              производилась оплата. Порядок возврата средств уточняйте у администрации
              интернет-магазина. Оплата происходит с использованием сервиса{' '}
              <a href="https://www.payanyway.ru" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                PayAnyWay www.payanyway.ru
              </a>
              .
            </p>
            <div className="mt-5 max-w-[430px]">
              <p className="text-[9px] font-semibold text-[#333]">Банковские сервисы</p>
              <p className="mt-1.5 text-[8px] leading-[1.5] text-[#999]">
                Системы онлайн-банкинга «Альфа-Клик», «Тинькофф Банк», «Промсвязьбанк», «Русский
                Стандарт», «Faktura.ru». Банковским или почтовым переводом, а также через систему
                денежных переводов «CONTACT».
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                {BANK_SERVICES.map((bank) => (
                  <img key={bank.label} src={bank.src} alt={bank.label} title={bank.label} className="h-9 w-auto object-contain" />
                ))}
              </div>
            </div>
            <p className="mt-5 text-[9px] leading-[1.45] text-[#666]">
              ООО «АСКХАУ»<br />ИНН 1655479795<br />ОГРН 1221600048493
            </p>
            <p className="mt-3 text-[9px] leading-[1.45] text-[#666]">
              420111, Республика Татарстан,<br />г. Казань, ул. Университетская, д. 14
            </p>
          </div>
          <div>
            <a href="mailto:info@askhow.ru" className="text-[19px] font-semibold">info@askhow.ru</a>
            <p className="mt-3 text-[10px]">+7(929)734-55-00</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {SOCIAL_LINKS.map(({ key, label, href, icon: Icon }) => (
                <a
                  href={href}
                  key={key}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#f8f9fa] text-[#181818] transition hover:bg-[#f0f0f0]"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
              <a
                href="#contacts"
                className="grid h-10 w-10 place-items-center rounded-full bg-[#f8f9fa] text-[10px] font-bold tracking-tight"
                aria-label="VK"
              >
                VK
              </a>
              <a
                href={MAX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 min-w-10 place-items-center rounded-full bg-[#f8f9fa] px-3 text-[9px] font-semibold"
                aria-label="Открыть AskHow в MAX"
              >
                MAX
              </a>
            </div>
            <a href="#contacts" className="mt-8 block text-[9px]">Контакты</a>
          </div>
          <div className="flex flex-col items-start sm:col-span-2 lg:col-span-1 lg:items-end">
            <button
              type="button"
              onClick={courseCta ? courseCta.onClick : undefined}
              className={`pay-button-motion h-11 w-full min-[390px]:w-auto min-[390px]:min-w-[190px] rounded-full px-7 text-[10px] font-medium ${
                courseCta?.teaser ? 'bg-[#22c55e] text-white' : 'bg-[#ffdc00]'
              }`}
            >
              {courseCta ? courseCta.label : 'Оставить заявку'}
            </button>
            <div className="mt-8 flex w-full flex-wrap items-start justify-between gap-6 lg:justify-end">
              <div className="max-w-[190px] text-left">
                <p className="text-[8px] leading-[1.5] text-[#999]">
                  Оплата происходит с использованием сервиса{' '}
                  <a href="https://www.payanyway.ru" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                    PayAnyWay
                  </a>{' '}
                  <a href="http://www.payanyway.ru" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                    www.payanyway.ru
                  </a>
                </p>
                <p className="mt-3 text-[8px] leading-[1.5] text-[#999]">
                  Банковские карты. Сервис приёма оплаты предоставлен PayAnyWay.
                </p>
                <div className="mt-2.5">
                  <CardBadges />
                </div>
              </div>
              <div className="text-left lg:text-right">
                <p className="text-[8px]">Powered by</p>
                <div className="mt-1 text-[18px] font-semibold text-[#d9b33d]">NAAN</div>
              </div>
            </div>
            <div className="mt-auto flex max-w-[340px] flex-wrap gap-x-6 gap-y-3 pt-9 text-[8px] lg:justify-end lg:text-right">
              <a href="https://www.askhow.ru/terms" target="_blank" rel="noopener noreferrer">
                Условия использования
              </a>
              <a href="https://www.askhow.ru/authoroffer" target="_blank" rel="noopener noreferrer">
                Оферта для авторов
              </a>
              <a href="https://www.askhow.ru/useroffer" target="_blank" rel="noopener noreferrer">
                Оферта для пользователей
              </a>
              <a href="https://www.askhow.ru/moderation_policy" target="_blank" rel="noopener noreferrer">
                Политика модерации
              </a>
              <a href="https://www.askhow.ru/privacy" target="_blank" rel="noopener noreferrer">
                Политика конфиденциальности
              </a>
            </div>
          </div>
        </div>
        <p className="mt-8 text-[8px] text-[#777]">© 2026 AskHow, LLC</p>
      </div>
      <CookieConsent />
    </footer>
  );
}
