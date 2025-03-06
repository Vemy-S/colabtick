import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { requestWithUser } from 'types';
import { CompanyDto } from '../dto/company-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard.guard';
import { Response } from 'express';

@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService ) {}

    @Post('create')
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    async createCompany(@Body() companyDetails: CompanyDto, @Req() req: requestWithUser, @Res() res: Response){
        const { user_id } = req.user
        const { company, acces_token } = await this.companyService.createGroup(companyDetails, user_id)
        res.cookie('token', acces_token )
        return company;
    }

    @Get('companies')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async getCompanies(@Req() req: requestWithUser){
        const { user_id } = req.user
        return await this.companyService.getCompanies(user_id);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async getCompany(@Req() req: requestWithUser, @Param('id') companyId: string){
        const { user_id } = req.user 
        console.log(companyId)
        return this.companyService.getCompany(user_id, companyId)
    }

}
