import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from 'passport-jwt'
import { User } from "src/users/models/users.model";
import { AuthService } from "../auth.service";
import { JwtPayload } from "../model/jwt-payload.model";

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ){
        super({
            jwtFromRequest: authService.returnJwtExtractor(),
            ignoreExpiration: false,
            secretOrKey:process.env.JWT_SECRET,
        })
    }
    async validate(jwtPayload: JwtPayload):Promise<User>{
        const user = await this.authService.validateUser(jwtPayload)
        if(!user){
            throw new UnauthorizedException()
        }
        return user
    }
}