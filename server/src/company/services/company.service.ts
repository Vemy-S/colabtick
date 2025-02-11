import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma.service';
import { CompanyDto } from '../dto/company-dto';
import { roles, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class CompanyService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async createGroup(company: CompanyDto, user_id: User['user_id']){
        try {
            if(!company || !user_id){
                throw new HttpException('No company or user_id provided', HttpStatus.BAD_REQUEST)
            }
            const user = await this.prisma.user.findUnique({
                where: { user_id },
                include: { userRoles: true }
            })

            const newCompany = await this.prisma.company.create({
                data: {
                    company_name: company.company_name,
                    acces_key: company.acces_key,
                    company_authorId: user.user_id
                }
            })

            const updateAdminRole = await this.prisma.userRole.update({
                where: { userId_companyId: { userId: user.user_id, companyId: newCompany.company_id } },
                data: { role: roles.ADMINISTRATOR }
            })
    
            const payload = {
                email: user.email,
                user_id: user_id,
                role: updateAdminRole.role
            }
    
            const acces_token = this.jwtService.sign(payload);
    
            return {
                company: newCompany,
                acces_token
            }
        } catch (error) {
            throw new HttpException('Error creating company', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
