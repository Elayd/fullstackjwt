import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import {AuthService} from '../auth.service';
import { PrismaService } from '../../prisma/prisma.service';

type JwtPayload = [sub: string, email: string];

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService,
              public prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'at-secret',
    });
  }

  async validate(payload: {sub: number, email: string}) {

    const data = {id: payload.sub ,email: payload.email}

    const user = await this.prismaService.user.findUnique({
      where: {
        id: data.id
      }
      }
    )

    return user
  }
}
