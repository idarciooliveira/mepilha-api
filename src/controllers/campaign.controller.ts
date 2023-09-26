import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreateUser } from './dtos/create-user';
import * as bcrypt from 'bcrypt';

@Controller('/campaigns')
export class AuthController {
    constructor(private readonly prismaService: PrismaService) { }

    @Post('/')
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


}
