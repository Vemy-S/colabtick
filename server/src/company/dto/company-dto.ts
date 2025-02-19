import { IsNotEmpty, IsString } from 'class-validator'

export class CompanyDto {

    @IsString()
    @IsNotEmpty()
    company_name: string

    @IsString()
    @IsNotEmpty()
    acces_key: string

}