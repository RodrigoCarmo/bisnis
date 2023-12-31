import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Validate,
  IsUUID,
  IsOptional,
} from "class-validator";
import { IsCpf } from "../utils/validators.utils";

export class CreateCustomerDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  phone: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsString()
  @MaxLength(11)
  @MinLength(11)
  @IsNotEmpty()
  @Validate(IsCpf, { message: "cpf number is invalid" })
  cpf: string;
}

export class CustomerIdDto {
  @IsUUID()
  id: string;
}

export class CpfOrEmailDto {
  @IsString()
  @MaxLength(11)
  @MinLength(11)
  @IsOptional()
  @Validate(IsCpf, { message: "cpf number is invalid" })
  cpf?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}

export class UpdateCustomerDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  password: string;
}
