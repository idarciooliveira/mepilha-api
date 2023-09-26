import { Body, Controller, Get, Param, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreateCampaign } from './dtos/create-campaign';
import { JwtAuthGuard } from 'src/services/auth/passport/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { StorageProvider } from 'src/services/storage/storage-provider';

@UseGuards(JwtAuthGuard)
@Controller('/campaigns')
export class CampaignController {
    constructor(private prismaService: PrismaService,
        private storageProvider: StorageProvider) { }


    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'cover', maxCount: 1 },
        { name: 'files', maxCount: 3 }
    ]))
    async create(@Body() body: CreateCampaign,
        @UploadedFiles() files: {
            cover?: any,
            files?: any
        }) {

        const coverFilename = files.cover ? await this.storageProvider.upload(files.cover[0], 'images') : null
        const images = []

        for await (const file of files.files) {
            let filename = await this.storageProvider.upload(file, 'images')
            images.push(filename)
        }

        const campaign = await this.prismaService.campaign.create({
            // @ts-ignore
            data: {
                ...body,
                cover_image: coverFilename,
                images: images,
                goalAmount: Number(body.goalAmount)
            }
        })

        return campaign
    }

    @Get()
    async getAll() {
        return await this.prismaService.campaign.findMany({
            where: {
                isApproved: true,
                isDone: false
            },
            include: {
                category: true
            }
        })
    }

    @Get('/:id')
    async getById(@Param('id') id: string) {
        return await this.prismaService.campaign.findUnique({
            where: {
                id: id,
                isApproved: true,
                isDone: false
            },
            include: {
                user: {
                    select: {
                        name: true,
                        lastname: true,
                        id: true
                    }
                },
                category: true
            }
        })
    }

    @Put('/:id/approve')
    async approve(@Param('id') id: string) {
        return await this.prismaService.campaign.update({
            where: {
                id: id,
            },
            data: {
                isApproved: true,
                isDone: false
            }
        })
    }

    @Put('/:id/cancel')
    async cancel(@Param('id') id: string) {
        return await this.prismaService.campaign.update({
            where: {
                id: id,
            },
            data: {
                isApproved: false,
                isDone: true
            }
        })
    }

    @Get('/users/:id')
    async getByUserId(@Param('id') id: string) {
        return await this.prismaService.campaign.findMany({
            where: {
                userId: id
            }
        })
    }
}
