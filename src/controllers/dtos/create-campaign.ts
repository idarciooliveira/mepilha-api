import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateCampaign {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    goalAmount: number

    @IsNotEmpty()
    categoryId: string

    @IsEmail()
    userId: string
}
