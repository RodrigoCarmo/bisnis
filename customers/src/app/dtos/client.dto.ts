import {
    IsEmail,
    IsString,
    MaxLength,
    MinLength,
    Validate,
} from 'class-validator';
import { IsCpf } from 'src/utils/validators.utils';

export class CreateClientDto {
    @IsEmail()
    email: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    phone: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsString()
    @MaxLength(11)
    @MinLength(11)
    @Validate(IsCpf, { message: 'cpf number is invalid' })
    cpf: string;
}
