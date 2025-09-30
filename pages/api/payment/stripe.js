import Stripe from 'stripe';

/**
 * API‑маршрут для создания сессии оплаты с помощью Stripe. Этот
 * эндпоинт вызывается со страницы бронирования. Мы используем данные
 * бронирования в качестве метаданных в платёжной сессии. В реальном
 * проекте перед созданием платежа запись о бронировании должна быть
 * добавлена в базу данных, а после успешного платежа обновлена через
 * webhook.
 */
const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: '2022-11-15' }) : null;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!stripe) {
    return res.status(500).json({ error: 'Stripe не настроен. Задайте STRIPE_SECRET_KEY в .env' });
  }
  try {
    const { date, time, name, email } = req.body;
    // Создаём сессию оплаты. Вы можете настроить валюту, цену и другие
    // параметры под свои нужды. Также можно использовать динамические цены
    // или продукты, созданные в Dashboard Stripe.
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Услуга',
              description: `Бронирование на ${date} ${time}`,
            },
            unit_amount: 5000, // стоимость в центах (пример: 50.00 USD)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      metadata: { date, time, name },
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/booking`,
    });
    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Ошибка Stripe:', error);
    return res.status(500).json({ error: 'Ошибка создания платёжной сессии' });
  }
}