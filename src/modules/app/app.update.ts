import { AppService } from './app.service';
import {Action, Hears, InjectBot, Start, Update} from "nestjs-telegraf";
import {Telegraf, Context} from "telegraf";

@Update()
export class AppUpdate {
  constructor(
      @InjectBot() private readonly bot: Telegraf<Context>,
      private readonly appService: AppService
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    return this.appService.start(ctx);
  }

  @Hears('Запустить 🚀')
  async openWeb(ctx: Context) {
    return this.appService.openWindow(ctx)
  }
}
