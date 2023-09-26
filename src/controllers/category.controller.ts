import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { JwtAuthGuard } from 'src/services/auth/passport/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('/categories')
export class CategoryController {
    constructor(private prismaService: PrismaService) { }

    @Get('/:id')
    async getById(@Param('id') id: string) {
        return await this.prismaService.category.findFirst({
            where: {
                id
            }
        })

    }

    @Get()
    async getAll(@Param('id') id: string) {
        return await this.prismaService.category.findMany()
    }

    @Post()
    async create(@Body() body: { description: string }) {
        const category = await this.prismaService.category.create({
            data: {
                ...body
            }
        })
        return category
    }


}
