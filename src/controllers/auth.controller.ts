import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreateUser } from './dtos/create-user';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/services/auth/auth.service';
import { LocalAuthGuard } from 'src/services/auth/passport/local-auth.guard';

@Controller('/auth')
export class AuthController {
    constructor(private readonly prismaService: PrismaService,
        private readonly authService: AuthService) { }

    @Post('/register')
    async createUser(@Body() body: CreateUser) {
        const hash = await bcrypt.hash(body.password, 10)

        const user = await this.prismaService.user.create({
            data: {
                ...body,
                password: hash
            }
        })

        return user
    }

    @UseGuards(LocalAuthGuard)
    @Post('/authenticate')
    async authenticate(@Request() req: any) {
        return await this.authService.login(req.user)
    }


}
