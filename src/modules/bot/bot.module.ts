import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BotUpdate } from './bot.update';
import UserModule from '../users/user.module';

@Module({
  imports: [
    UserModule,
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get('telegram_token'),
      }),
    }),
  ],
  providers: [BotService, BotUpdate],
})
export default class BotModule {}
