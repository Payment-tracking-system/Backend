import { Module } from '@nestjs/common';
import { AppUpdate } from './app.update';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from '@nestjs/config';
import config from '../../config';
import {TelegrafModule} from "nestjs-telegraf";
import * as LocalSession from 'telegraf-session-local'
import {AppController} from "./app.controller";
import { HttpModule } from '@nestjs/axios';

const sessions = new LocalSession({database: 'session_db.json'})

@Module({
  imports: [
      HttpModule.registerAsync({
          useFactory: () => ({
              timeout: 5000,
              maxRedirects: 5,
          }),
      }),
      TelegrafModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
              middlewares: [sessions.middleware()],
              token: configService.get('telegram_token')
          })
      }),
      ConfigModule.forRoot({
        envFilePath: '.env',
        load: [config],
        isGlobal: true
      })
  ],
  controllers: [AppController],
  providers: [AppService, AppUpdate]
})

export class AppModule {}
