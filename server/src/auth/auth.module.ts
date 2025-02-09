import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './services/jwt-strategy.service';
import { PrismaService } from 'src/libs/prisma.service';
import { GoogleStrategy } from './services/google-strategy.ts.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config'; 

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),  
        JwtModule.registerAsync({
            imports: [ConfigModule], 
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET_KEY'),  
                signOptions: { expiresIn: '1h' }, 
            }),
            inject: [ConfigService], 
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, GoogleStrategy, PrismaService, JwtStrategy],
})
export class AuthModule {}