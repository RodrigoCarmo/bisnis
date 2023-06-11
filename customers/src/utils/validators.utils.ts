import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

@ValidatorConstraint({ name: "isCpf" })
export class IsCpf implements ValidatorConstraintInterface {
  validate(cpf: string): boolean {
    return cpfValidator.isValid(cpf);
  }
}
