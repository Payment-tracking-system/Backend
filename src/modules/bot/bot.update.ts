import { Hears, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Telegraf, Context } from 'telegraf';
import { BotService } from './bot.service';

@Update()
export class BotUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly botService: BotService,
  ) {
    bot.on('callback_query', (ctx) => this.botService.handleCallbackQuery(ctx));
  }

  @Start()
  async startCommand(ctx: Context) {
    if (!(await this.botService.checkGroupMembership(ctx))) {
      return;
    }
    return this.botService.start(ctx);
  }
}
