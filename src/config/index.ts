import * as process from 'process';

export default () => ({
  port: process.env.MAIN_PORT,
  telegram_token: process.env.TELEGRAM_TOKEN,
  auth_token: process.env.AUTH_TOKEN,
  frontend_url: process.env.BASE_FRONTEND_URL,
  bank_api: process.env.BASE_BANK_API_URL,
  merchant_id: process.env.SPB_MERCHANT_ID,
  db_port: process.env.DB_PORT,
  db_name: process.env.DB_NAME,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_host: process.env.DB_HOST,
  bot_url: process.env.TG_BOT_URL,
});
