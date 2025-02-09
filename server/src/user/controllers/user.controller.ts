import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard.guard';

@Controller('user')
export class UserController {
    @Get('')
    @UseGuards(JwtAuthGuard)
    getUser(@Req() req){
        return req.user
    }
}
