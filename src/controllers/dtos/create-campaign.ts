import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCampaign {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    goalAmount: string

    @IsUUID()
    categoryId: string

    @IsUUID()
    userId: string
}
