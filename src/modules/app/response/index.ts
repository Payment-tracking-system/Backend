import {IsString} from "class-validator";

export class StatusResponse {
    @IsString()
    qrStatus: string
}