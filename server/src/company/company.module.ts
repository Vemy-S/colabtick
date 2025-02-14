import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company.controller';
import { CompanyService } from './services/company.service';
import { PrismaService } from 'src/libs/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CompanyInvitationController } from './controllers/company-invitation.controller';
import { CompanyInvitationService } from './services/company-invitation.service';
import { MailInvitationService } from './services/mail-invitation.service';


@Module({
  imports: [],
  providers: [CompanyService, PrismaService, JwtService, CompanyInvitationService, MailInvitationService],
  controllers: [CompanyController, CompanyInvitationController]
})
export class CompanyModule {}