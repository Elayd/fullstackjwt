import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PrismaService } from '../../prisma/prisma.service';
declare const AtStrategy_base: new (...args: any[]) => Strategy;
export declare class AtStrategy extends AtStrategy_base {
    private readonly authService;
    prismaService: PrismaService;
    constructor(authService: AuthService, prismaService: PrismaService);
    validate(payload: {
        sub: number;
        email: string;
    }): Promise<import(".prisma/client").User>;
}
export {};
