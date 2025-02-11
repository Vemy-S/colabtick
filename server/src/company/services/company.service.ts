import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma.service';
import { CompanyDto } from '../dto/company-dto';

@Injectable()
export class CompanyService {
    constructor(private prisma: PrismaService) {}
    createGroup(company: CompanyDto){
        if(!company){
            throw new HttpException('No company info provided', HttpStatus.BAD_REQUEST)
        }
        return this.prisma.company.create({
            data: {
                company_name: company.company_name,
                acces_key: company.acces_key,
                company_authorId: company.company_authorId
            }
        })
    }
}
