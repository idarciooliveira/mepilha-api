import { IsNotEmpty, IsEmail, IsUUID } from 'class-validator';

export class SupportCampaign {
    @IsNotEmpty()
    amount: number

    @IsUUID()
    campaignId: string

    @IsUUID()
    userId: string

    @IsNotEmpty()
    paymentMethod: string


}
