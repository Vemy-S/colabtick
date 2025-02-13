import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Company, roles, User } from '@prisma/client';
import { PrismaService } from 'src/libs/prisma.service';
import { invitationDataDto } from '../dto/invitationData-dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CompanyInvitationService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generateInvitation(
    company_authorId: User['user_id'],
    invitationData: invitationDataDto,
  ) {
    const userSendInvitation = await this.prisma.user.findUnique({
      where: { user_id: company_authorId },
    });

    if (!userSendInvitation) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const userToSendInvitation = await this.prisma.user.findUnique({
      where: { email: invitationData.emailToSend }
    })

    if (!userToSendInvitation) {
      throw new HttpException('User to send invitation not found', HttpStatus.NOT_FOUND);
    }

    const isAdmin = await this.prisma.userRole.findUnique({
      where: {
        userId_companyId: {
          userId: company_authorId,
          companyId: invitationData.company_id,
        },
        role: roles.ADMINISTRATOR
      },
    });

    if (!isAdmin) {
      throw new HttpException(
        'User does not have admin rol in this company',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const company = await this.prisma.company.findUnique({
      where: { company_id: invitationData.company_id },
    });

    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }

    const payload = {
      company_id: invitationData.company_id,
      companyAuthorId: company_authorId,
    };
    
    const invitation_token =  this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_INVITATION_KEY'),
      expiresIn: '15m',
    });

    const userSend = {
      name: userSendInvitation.displayName,
      email: userSendInvitation.email
    }

    const userToSend = {
      name: userToSendInvitation.displayName,
      email: userToSendInvitation.email
    }

    return {
      invitation_token,
      company_name: company.company_name,
      userSend,
      userToSend
    }
  }
}
