import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    const clientID = configService.get('CLIENT_ID_KEY');
    const callbackURL = `${configService.get('BASE_BACKEND_URL')}/api/auth/google/redirect`;
    const clientSecret = configService.get('CLIENT_SECRET_KEY');
    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['profile', 'email'],
    });
  }

  async validate(accesToken: string, refreshToken: string, profile: Profile) {
    const user = await this.authService.validateUser({
      email: profile.emails[0].value!,
      displayName: profile.displayName,
      google_user: true,
    });

    const payload = { email: user.email, user_id: user.user_id };

    if(!payload){
      throw new HttpException('No payload provided', HttpStatus.UNAUTHORIZED)
    }
    console.log('payload', payload)
    const accessToken = this.jwtService.sign(payload);

    const userWithToken = {
      ...user,
      accessToken,
    };

    return userWithToken || null;
  }
}
