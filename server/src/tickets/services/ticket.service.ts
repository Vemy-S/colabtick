import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma.service';
import { createTicketDto } from 'src/tickets/dto/create-ticket.dto';
import { status as enumStatus, UserRole } from '@prisma/client';

@Injectable()
export class TicketService {

    constructor(private prisma: PrismaService) {}

    async createTicket(ticket: createTicketDto, user_id: number, userRoles: UserRole[]){
        if(!user_id){
            throw new HttpException('No user id provided', HttpStatus.BAD_REQUEST)
        } 

        if(!ticket || ![enumStatus.COMPLETED, enumStatus.BLOCKED, enumStatus.FINISHED, 
            enumStatus.ASSIGNED, enumStatus.TAKED, enumStatus.UNASSIGNED
        ].includes(ticket.status)){
            throw new HttpException('Invalid ticket', HttpStatus.BAD_REQUEST)
        } 

        const someCompanyId = userRoles.some( userCompany => userCompany.companyId === ticket.company_id )

        if(!someCompanyId){
            throw new HttpException('Company is not coincident', HttpStatus.UNAUTHORIZED)
        }
     
        const newTicket = await this.prisma.ticket.create({
           data: {
            title: ticket.title,
            content: ticket.content,
            status: ticket.status,
            authorId: user_id,
            companyId: ticket.company_id
           }
        })
        
        return newTicket
    }

    async getTickets(){
        const tickets = await this.prisma.ticket.findMany()
        if(!tickets){
            throw new HttpException('No tickets found', HttpStatus.NOT_FOUND)
        }
        return tickets
    }

    async getTicket(id: number){
        const ticket = await this.prisma.ticket.findUnique({
            where: { ticket_id : id }
        })
        if(!ticket){
            throw new HttpException('No ticket found', HttpStatus.NOT_FOUND);
        }
        return ticket;
    }

    async deleteTickets(){
        const tickets = await this.prisma.ticket.deleteMany()

        return `Tickets deleted ${tickets}`
    }
}
