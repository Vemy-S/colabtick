import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class invitationDataDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    emailToSend: string

    @IsString()
    @IsNotEmpty()
    company_id: string
}