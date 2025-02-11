import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company.controller';
import { CompanyService } from './services/company.service';
import { PrismaService } from 'src/libs/prisma.service';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [],
  providers: [CompanyService, PrismaService, JwtService],
  controllers: [CompanyController]
})
export class CompanyModule {}