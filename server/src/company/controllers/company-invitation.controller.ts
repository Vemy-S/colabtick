import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard.guard';
import { requestWithUser } from 'types';
import { CompanyInvitationService } from '../services/company-invitation.service';
import { Company } from '@prisma/client';
import { invitationDataDto } from '../dto/invitationData-dto';

@Controller('company-invitation')
export class CompanyInvitationController {

    constructor(private companyInvitationService: CompanyInvitationService) {}
    
    @Post('invitation/:id')
    @UseGuards(JwtAuthGuard)
    async generateInvitation(@Req() req: requestWithUser, @Body() invitationData: invitationDataDto){
        await this.companyInvitationService.generateInvitation(req.user.user_id, invitationData);
    }
}
