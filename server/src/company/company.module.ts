import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company.controller';
import { CompanyService } from './services/company.service';
import { PrismaService } from 'src/libs/prisma.service';


@Module({
  imports: [],
  providers: [CompanyService, PrismaService],
  controllers: [CompanyController]
})
export class CompanyModule {}