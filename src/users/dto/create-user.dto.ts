import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ description: 'User e-mail' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'User name' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Information about user privileges',
        default: false,
    })
    @IsBoolean()
    admin: boolean;
}
