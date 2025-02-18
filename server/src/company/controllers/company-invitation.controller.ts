import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard.guard';
import { requestWithUser } from 'types';
import { CompanyInvitationService } from '../services/company-invitation.service';
import { invitationDataDto } from '../dto/invitationData-dto';
import { MailInvitationService } from '../services/mail-invitation.service';

@Controller('company-invitation')
export class CompanyInvitationController {

    constructor(private companyInvitationService: CompanyInvitationService, private mailInvitationService: MailInvitationService) {}
    
    @Post('invitation')
    @UseGuards(JwtAuthGuard)
    async generateInvitation(@Req() req: requestWithUser, @Body() invitationData: invitationDataDto){
        return await this.companyInvitationService.generateInvitation(req.user.user_id, invitationData);
    }

    @Get('invitation')
    @UseGuards(JwtAuthGuard)
    async validateInvitation(@Req() req: requestWithUser, @Query('token') token: string, @Query('uuid') uuid: string){
        return await this.companyInvitationService.validateInvitation(req.user.user_id, token, uuid);
    }

}
