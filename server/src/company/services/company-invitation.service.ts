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

    const invitation_url = `${this.configService.get('BASE_FRONTEND_URL')}/invitation?token=${invitation_token}`

    return {
      invitation_url,
      company_name: company.company_name,
    }
  }

  async validateInvitation(user_invited : User['user_id'], token: string, uuid: string){
    if(!user_invited || !token || !uuid ){
      throw new HttpException('user_id, token or uuid not provided', HttpStatus.UNAUTHORIZED)
    }

    const payload = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_INVITATION_KEY')
    })

    const { company_id } = payload;

    if(uuid !== company_id){
      throw new HttpException('UUID is not coincident', HttpStatus.UNAUTHORIZED)
    }

    const userInvited = await this.prisma.user.findUnique({
      where: { user_id: user_invited },
      include: { company: true }
    }) 

    if(!userInvited){
      throw new HttpException('User is not logged in', HttpStatus.UNAUTHORIZED)
    }

    const alreadyMember = userInvited.company.some(userCompany => userCompany.company_id === company_id)

    if(alreadyMember){
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
    }

    const updatedCompanyUser = await this.prisma.user.update({
      where: { user_id: userInvited.user_id },
      data: { company : company_id }
    }) 

    return `${updatedCompanyUser.displayName} accepted succesfully`
  }
}
