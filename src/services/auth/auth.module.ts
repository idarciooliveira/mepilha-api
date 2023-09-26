import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./passport/constants";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./passport/local.strategy";
import { JwtStrategy } from "./passport/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, PrismaService],
    exports: [AuthService],
})
export class AuthModule { }