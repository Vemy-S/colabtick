import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketService } from './tickets/services/ticket.service';
import { PrismaService } from './libs/prisma.service';
import { TicketModule } from './tickets/ticket.module';
import { AuthService } from './auth/services/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-guard.guard';
import { UserModule } from './user/user.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './auth/services/jwt-strategy.service';

@Module({
  imports: [TicketModule, AuthModule, UserModule, ConfigModule.forRoot({
    isGlobal: true
  })],
  controllers: [AppController],
  providers: [AppService, TicketService, PrismaService, AuthService, JwtAuthGuard, JwtService, JwtStrategy],
})
export class AppModule {}
