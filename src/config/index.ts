import * as process from "process";

export default () => ({
    port: process.env.MAIN_PORT,
    telegram_token: process.env.TELEGRAM_TOKEN,
    auth_token: process.env.AUTH_TOKEN,
    frontend_url: process.env.BASE_FRONTEND_URL,
    bank_api: process.env.BASE_BANK_API_URL,
    merchant_id: process.env.SPB_MERCHANT_ID
})