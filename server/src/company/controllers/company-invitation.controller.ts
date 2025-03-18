import { Body, Controller, Get, Param, Post, Query, Redirect, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard.guard';
import { requestWithUser } from 'types';
import { CompanyInvitationService } from '../services/company-invitation.service';
import { MailInvitationService } from '../services/mail-invitation.service';
import { ConfigService } from '@nestjs/config';

@Controller('company-invitation')
export class CompanyInvitationController {

    constructor(private companyInvitationService: CompanyInvitationService, private mailInvitationService: MailInvitationService) {}
    
    @Post('generate')
    @UseGuards(JwtAuthGuard)
    async generateInvitation(@Req() req: requestWithUser, @Body() invitationDetails: any){
        const { company_id } = invitationDetails 
        return await this.companyInvitationService.generateInvitation(req.user.user_id, company_id);
    }

    @Get('validate')
    @UseGuards(JwtAuthGuard)
    async validateInvitation(@Req() req: requestWithUser, @Query('token') token: string, @Query('uuid') uuid: string){
        console.log('token', token)
        console.log('uuid', uuid)
        console.log(Query)
        console.log('user', req.user.user_id)
        return await this.companyInvitationService.validateInvitation(req.user.user_id, token, uuid);
    }

}
