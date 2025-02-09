import { Controller, Get, Res, UseGuards, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { requestWithUser } from 'types';
import { Response } from 'express';
import { GoogleAuthGuard } from '../guards/google-oauth.guard';
import { JwtAuthGuard } from '../guards/jwt-guard.guard';

@Controller('auth')
export class AuthController {
    constructor(private configService: ConfigService) {}

    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    googleAuth(@Res() res){
        return {msg: "Google login"}
    }

    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    googleAuthRedirect(@Req() req: requestWithUser, @Res({ passthrough: true}) res: Response){
        console.log(req.user)
        const { accessToken } = req.user
        res.cookie('token', accessToken, {
            httpOnly: true 
        })
        return res.redirect(this.configService.get('BASE_FRONTEND_URL'))
    }

    @Get('test')
    @UseGuards(JwtAuthGuard)
    test(@Req() req: requestWithUser){
        return {
            msg: "User authenticated",
            req: req.user
        }
    }

}
