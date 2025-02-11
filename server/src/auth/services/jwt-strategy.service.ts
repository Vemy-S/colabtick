import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Payload } from "types";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        const secretOrKey = configService.get('JWT_SECRET_KEY')
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req) => req.cookies['token']
            ]),
            ignoreExpiration: false,
            secretOrKey
        });
    }

    async validate(payload: any) {
        console.log('payload para el JWT strategy', payload)
        return { email: payload.email, user_id: payload.user_id  };
    }
}