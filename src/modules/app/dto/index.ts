import {IsString} from "class-validator";

export class CreateQrDTO {
    @IsString()
    qrType: string;

    @IsString()
    qrDescription: string;

    @IsString()
    amount: string;
}