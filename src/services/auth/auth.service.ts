import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma.service";
import { compare } from "bcrypt";
import { User } from "@prisma/client";

export type ValidateUserProps = {
    email: string
    password: string
}
@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService,
        private jwtService: JwtService) { }

    async validateUser({ email, password }: ValidateUserProps) {

        try {
            const user = await this.prismaService.user.findFirst({
                where: {
                    email
                }
            })

            if (!await compare(password, user.password)) {
                throw new UnauthorizedException();
            }
            return user;

        } catch (error) {
            return null
        }

    }

    async login(user: User) {

        const { name, lastname, id } = user

        const payload = {
            id: id,
            name: `${name} ${lastname}`,
        }

        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}