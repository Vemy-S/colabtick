import { IsNotEmpty, IsString } from "class-validator";


export class invitationDataDto {
    @IsString()
    @IsNotEmpty()
    company_id: string
}