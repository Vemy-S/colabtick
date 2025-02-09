import { status } from '@prisma/client'
import { IsNotEmpty, IsString } from 'class-validator'

export class createTicketDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    status: status

}
