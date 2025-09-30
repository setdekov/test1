import { useEffect } from 'react';

/**
 * Страница чата. В качестве примера мы подключаем виджет Crisp Chat.
 * Для работы вам понадобится ID вашей учётной записи Crisp. Вы можете
 * заменить эту интеграцию на Tidio, Telegram Web App или любой другой
 * виджет, который вам удобен. История переписки может быть отправлена
 * в CRM через ваш backend.
 */
export default function Chat() {
  useEffect(() => {
    // Замените строку ниже вашим идентификатором сайта Crisp
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = 'replace-with-your-crisp-id';
    (function () {
      const d = document;
      const s = d.createElement('script');
      s.src = 'https://client.crisp.chat/l.js';
      s.async = 1;
      d.getElementsByTagName('head')[0].appendChild(s);
    })();
    return () => {
      // Чистим скрипт при размонтировании
      const script = document.querySelector('script[src="https://client.crisp.chat/l.js"]');
      if (script) script.remove();
    };
  }, []);
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Чат с клиентами</h1>
      <p>Внизу справа появится чат‑виджет после загрузки страницы.</p>
    </div>
  );
}