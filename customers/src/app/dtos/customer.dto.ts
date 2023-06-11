import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from "class-validator";
import { IsCpf } from "src/utils/validators.utils";

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
