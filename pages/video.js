import { useEffect, useState } from 'react';

/**
 * Страница для просмотра приватных видео‑материалов. Доступ к
 * контенту ограничивается проверкой статуса пользователя. В этом примере
 * проверка упрощена: ролики доступны всегда. В реальном приложении
 * интегрируйте Supabase или Firebase для управления доступом.
 */
export default function VideoPage() {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Проверка авторизации пользователя (упрощено). В реальном
    // приложении используйте Supabase или Firebase для проверки доступа.
    setAuthorized(true);
  }, []);

  if (!authorized) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Видеоуроки</h1>
        <p>Доступ к видеоурокам предоставляется после оплаты или авторизации.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Видеоуроки</h1>
      <p>Ниже приведён пример встроенного видео. В реальном проекте вы можете
        использовать Bunny, Mux или Cloudflare Stream для хостинга. Ссылки
        должны быть защищены токенами, которые генерируются на сервере.</p>
      <video width="640" height="360" controls>
        {/* Замените URL на ваш защищённый видеопоток */}
        <source src="https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4" type="video/mp4" />
        Ваш браузер не поддерживает воспроизведение видео.
      </video>
    </div>
  );
}