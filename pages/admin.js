import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

/**
 * Административная панель. Здесь администратор может просматривать
 * список бронирований и управлять пользователями. В этом примере мы
 * используем Supabase в качестве бэкенда. Для работы вам нужно
 * установить переменные окружения NEXT_PUBLIC_SUPABASE_URL и
 * NEXT_PUBLIC_SUPABASE_KEY. В другом случае выводится заглушка.
 */
export default function Admin() {
  const [bookings, setBookings] = useState(null);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

  useEffect(() => {
    if (!supabase) return;
    const loadBookings = async () => {
      const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
      if (!error) setBookings(data);
    };
    loadBookings();
  }, [supabase]);

  if (!supabase) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Админ‑панель</h1>
        <p>Supabase не настроен. Пожалуйста, задайте переменные окружения NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_KEY.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Админ‑панель</h1>
      <h2>Список бронирований</h2>
      {!bookings && <p>Загрузка…</p>}
      {bookings && bookings.length === 0 && <p>Бронирований пока нет.</p>}
      {bookings && bookings.length > 0 && (
        <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Дата</th>
              <th>Время</th>
              <th>Имя</th>
              <th>Email</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}