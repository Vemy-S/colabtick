import { Module } from '@nestjs/common';
import { TicketService } from './services/ticket.service';
import { PrismaService } from 'src/libs/prisma.service';
import { TicketController } from './controllers/ticket.controller';

@Module({
    imports: [],
    controllers: [TicketController],
    providers: [TicketService, PrismaService]
})
export class TicketModule {}
