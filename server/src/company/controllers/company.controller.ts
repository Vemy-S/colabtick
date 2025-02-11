import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { Request } from 'express';
import { CompanyDto } from '../dto/company-dto';
import { requestWithUser } from 'types';


@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService ) {}

    @Post()
    @HttpCode(201)
    createCompany(@Body() CompanyDto, @Req() req: requestWithUser){

        // AGREGAR ROLE AL PAYLOAD Y TYPE.
        return this.companyService.createGroup(CompanyDto, req.user.role )
    }
}
