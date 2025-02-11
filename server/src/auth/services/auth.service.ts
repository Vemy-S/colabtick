import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma.service';
import { userDetails } from 'types';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService) { }

    async validateUser(details: userDetails) {
        if(!details){
            throw new HttpException('User information not provided', HttpStatus.BAD_REQUEST)
        }
        const user = await this.prisma.user.findUnique({
            where: { email: details.email },
            include: { userRoles: true }
        })
       
        if(user) return user;
        const newUser = await this.prisma.user.create({
            data: {
               displayName: details.displayName,
               email: details.email,
               google_user: details.google_user
            }
           })
           
           console.log(newUser)
        return newUser;
    }
    
}
