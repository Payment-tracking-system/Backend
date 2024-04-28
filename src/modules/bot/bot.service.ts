import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../users/user.service';

@Injectable()
export class BotService {
  constructor(
      private readonly configService: ConfigService,
      private readonly userService: UserService,
  ) {}

  public readonly checkGroupMembership = async (ctx: Context) => {
    const userId = ctx.message.from.id;
    const user = await this.userService.getUserById(userId);
    if (user) {
      return true;
    }
    if (ctx.chat.type !== 'group') {
      await ctx.reply(
          '❌ Отказ в доступе \n \n Извините, вас нет в списке разрешенных пользователей.',
      );
      return false;
    }

    const chatId = ctx.chat.id;
    const chatMember = await ctx.telegram.getChatMember(chatId, ctx.from.id);

    if (
        chatMember.status !== 'administrator' &&
        chatMember.status !== 'member' &&
        chatMember.status !== 'creator'
    ) {
      await ctx.reply(
          '❌ Отказ в доступе \n \n Извините, вам недостаточно прав.',
      );
      return false;
    }

    return true;
  };

  async start(ctx: Context) {
    const userId = ctx.message.from.id;
    const user = await this.userService.getUserById(userId);
    if (!user) {
      await ctx.reply(
          `👋 Привет ${ctx.message.from.first_name}! \n \n ❓ Данный бот предназначен для проверки статуса оплаты`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'Добавить свой профиль ➕',
                    callback_data: 'check_payment_status',
                  },
                ],
              ],
            },
          },
      );
      return;
    }

    if (ctx.chat.type === 'group') {
      await ctx.reply(
          `👋 Привет ${ctx.message.from.first_name}! \n \n ❓ Данный бот предназначен для проверки статуса оплаты`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'Запустить 🚀',
                    url: this.configService.get('bot_url'),
                  },
                ],
              ],
            },
          },
      );
    }

    await ctx.reply(
        `👋 Привет ${ctx.message.from.first_name}! \n \n ❓ Данный бот предназначен для проверки статуса оплаты`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Запустить 🚀',
                  web_app: { url: this.configService.get('frontend_url') },
                },
              ],
            ],
          },
        },
    );
  }

  async handleCallbackQuery(ctx: Context) {
    const userId = ctx.callbackQuery.from.id;
    const user = await this.userService.getUserById(userId);
    if (!user) {
      await this.userService.createUser(userId);
    }
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    await ctx.reply(
        `✅ Ваш аккаунт был добавлен \n \n Теперь вы можете пользоваться ботом!`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Запустить 🚀', url: this.configService.get('bot_url') }],
            ],
          },
        },
    );
  }
}