import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';
import { CreateQrDTO } from './dto';
import { HttpService } from '@nestjs/axios';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { StatusResponse } from './response';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async generateQr(dto: CreateQrDTO) {
    const config = {
      method: 'post',
      url: `${this.configService.get('bank_api')}qrs`,
      headers: {
        Authorization: this.configService.get('auth_token'),
      },
      data: {
        ...dto,
        order: uuidv4(),
        sbpMerchantId: this.configService.get('merchant_id'),
      },
    };

    try {
      const response = await this.httpService.request(config).toPromise();
      return response.data;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getStatus(id: string): Promise<StatusResponse> {
    const config = {
      method: 'get',
      url: `${this.configService.get('bank_api')}qrs/${id}`,
      headers: {
        Authorization: this.configService.get('auth_token'),
      },
      body: {
        sbpMerchantId: this.configService.get('merchant_id'),
      },
    };

    try {
      const response = await this.httpService.request(config).toPromise();
      return { qrStatus: response.data.qrStatus };
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

// https://qna.habr.com/q/965545
