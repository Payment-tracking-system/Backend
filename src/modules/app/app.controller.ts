import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {CreateQrDTO} from "./dto";
import {AppService} from "./app.service";

@Controller('bills')
export class AppController {
    constructor(
        private readonly appService: AppService
    ) {}

    @Get('get/:id')
    getStatus(@Param('id') id: string) {
        return this.appService.getStatus(id)
    }

    @Post('create')
    async generateQr(@Body() dto: CreateQrDTO) {
        return await this.appService.generateQr(dto);
    }
}