import Link from 'next/link';

/**
 * Главная страница платформы. Здесь находятся ссылки на основные разделы
 * приложения: бронирование услуг, просмотр приватных видео, чат и
 * административная панель. Дизайн остаётся простым и лаконичным для
 * скорейшего запуска MVP.
 */
/**
 * Главная страница. Здесь перечислены основные разделы сайта. Все
 * названия указаны на русском языке. Регистрации на данной странице
 * нет, как в лаконичном варианте дизайна.
 */
export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Онлайн‑платформа бронирования</h1>
      <p>Выберите один из разделов ниже:</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: '1rem' }}>
          <Link href="/booking">Бронирование услуг</Link>
        </li>
        <li style={{ marginBottom: '1rem' }}>
          <Link href="/video">Видеоуроки</Link>
        </li>
        <li style={{ marginBottom: '1rem' }}>
          <Link href="/chat">Чат с клиентами</Link>
        </li>
        <li style={{ marginBottom: '1rem' }}>
          <Link href="/admin">Админ‑панель</Link>
        </li>
      </ul>
    </div>
  );
}