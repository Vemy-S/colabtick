import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma.service';
import { CompanyDto } from '../dto/company-dto';
import { roles, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class CompanyService {
    constructor(private prisma: PrismaService, private jwtService: JwtService, private configService: ConfigService) {}

    async createGroup(company: CompanyDto, user_id: User['user_id']){
        try {
            if(!company || !user_id){
                throw new HttpException('No company or user_id provided', HttpStatus.BAD_REQUEST)
            }
            const user = await this.prisma.user.findUnique({
                where: { user_id },
                include: { userRoles: true }
            })

            if (!user) {
                throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
            }

            const existingCompany = await this.prisma.company.findUnique({
                where: { company_authorId: user.user_id },
            })
    
            if (existingCompany) {
                throw new HttpException('User already has a company', HttpStatus.BAD_REQUEST);
            }

            const newCompany = await this.prisma.company.create({
                data: {
                    company_name: company.company_name,
                    acces_key: company.acces_key,
                    company_authorId: user.user_id
                }
            })

            const createAdminRole = await this.prisma.userRole.create({
                data: {
                    userId: user.user_id,
                    companyId: newCompany.company_id,
                    role: roles.ADMINISTRATOR
                }
            })
    
            const payload = {
                email: user.email,
                user_id: user_id,
                role: createAdminRole.role
            }
    
            const acces_token = this.jwtService.sign(payload, {
                secret: this.configService.get('JWT_SECRET_KEY')
            })

            return {
                company: newCompany,
                acces_token
            }
        } catch (error) {
            console.log(error)
            throw new HttpException('Error creating company', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getCompany(user_id: User['user_id'], companyId: string){
    
        const user = await this.prisma.user.findUnique({
            where: { user_id },
            include: { company: true }
        })

        if(!user){
            throw new HttpException('User doesnt exist', HttpStatus.NOT_FOUND)
        }

        const { company } = user
        const userCompaniesIds = company.map((company) => company.company_id)

        const isMatchCompany = userCompaniesIds.includes(companyId)
        if(!isMatchCompany){
            throw new HttpException('Access denied: This company does not belong to the user', HttpStatus.FORBIDDEN)
        }

        const companyFound = await this.prisma.company.findUnique({
            where: { company_id: companyId }
        })

        const { acces_key, ...CompanyWithOutAccesKey } = companyFound;

        return CompanyWithOutAccesKey;
    }
    
    async getCompanies(user_id: User['user_id']){
        const companies = await this.prisma.userRole.findMany({
            where: { userId: user_id },
            include: { company: true },
        }) 
        const userCompanies = companies.map(({ role, company }) => {
            const { company_name, company_id, createdAt } = company
            return {
                role,
                company: {
                    company_name,
                    company_id,
                    createdAt
                }
            }
        })
        return userCompanies;
    }
}
