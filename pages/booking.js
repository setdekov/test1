import { useState } from 'react';

/**
 * Страница бронирования. Пользователь может выбрать дату и время,
 * указать свои контактные данные и инициировать процесс оплаты. По
 * умолчанию интеграция идёт через Stripe (для международных платежей).
 * В реальном проекте вы можете переключать интеграцию в зависимости от
 * локации пользователя (Stripe или Тинькофф) и сохранять бронь в базе данных.
 */
export default function Booking() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Отправляем данные на API для создания платежной сессии. В реальной
      // реализации можно добавить параметр, выбирающий между Stripe и
      // Тинькофф, а также сохранить бронь в базе данных (Supabase/Firebase).
      const res = await fetch('/api/payment/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, time, name, email }),
      });
      const data = await res.json();
      if (data.url) {
        // Перенаправляем пользователя на платёжную страницу Stripe
        window.location.href = data.url;
      } else {
        alert('Бронирование создано: ' + JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка при бронировании');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Бронирование услуги</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '0.75rem' }}>
        <label>
          Дата:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <label>
          Время:
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </label>
        <label>
          Имя:
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Обработка…' : 'Забронировать и оплатить'}
        </button>
      </form>
    </div>
  );
}