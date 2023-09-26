import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUser {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    lastname: string

    @IsNotEmpty()
    identity: string

    @IsNotEmpty()
    phoneNumber: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string
}
