import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, UseGuards, Req, HttpStatus } from '@nestjs/common';
import { TicketService } from '../services/ticket.service';
import { createTicketDto } from '../dto/create-ticket.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard.guard';

@Controller('tickets')
export class TicketController {

    constructor(private ticketService: TicketService) { }

    @Get('')
    async getTasks(){
        return await this.ticketService.getTickets();
    }

    @Get(':id')
    async getTicket(@Param('id', ParseIntPipe) id: number){
        return await this.ticketService.getTicket(id);
    }    

    @Post('create/:id')
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    async createTicket(@Body() ticket: createTicketDto, @Req() req: any, @Param('id') companyId: string){
        return {
            content: ticket.content,
            status: ticket.status,
            companyId: companyId
        }
    }

    @Post('delete')
    @HttpCode(200)
    async deleteTickets(){
        return await this.ticketService.deleteTickets()
    }
 
}   