import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { JwtAuthGuard } from 'src/services/auth/passport/jwt-auth.guard';
import { SupportCampaign } from './dtos/support-campaign';

@UseGuards(JwtAuthGuard)
@Controller('/payments')
export class PaymentController {
    constructor(private prismaService: PrismaService) { }

    @Get('/:id')
    async getAll(@Param('id') id: string) {
        return await this.prismaService.transaction.findUnique({
            where: {
                id
            },
            include: {
                user: true,
                campaign: {
                    include: {
                        category: true
                    }
                }
            }
        })

    }

    @Get('/users/:id')
    async totalgained(@Param('id') id: string) {
        const transactions = await this.prismaService.transaction.findMany({
            where: {
                campaign: {
                    userId: id
                }
            }
        })

        return transactions.reduce((prev, next) => prev + next.amount, 0)

    }

    @Post()
    async supportCampaign(@Body() body: SupportCampaign) {
        const transaction = await this.prismaService.transaction.create({
            data: {
                ...body
            }
        })

        await this.prismaService.campaign.update({
            where: {
                id: transaction.campaignId
            },
            data: {
                numberOfSupport: { increment: 1 },
                amountReceived: { increment: body.amount }
            }
        })

        return transaction
    }


}
