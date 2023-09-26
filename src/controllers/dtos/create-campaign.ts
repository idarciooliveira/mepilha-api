import { IsNotEmpty, IsEmail, IsUUID } from 'class-validator';

export class CreateCampaign {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    goalAmount: number

    @IsUUID()
    categoryId: string

    @IsUUID()
    userId: string
}
