import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "isCpf" })
export class IsCpf implements ValidatorConstraintInterface {
  validate(cpf: string): boolean {
    const cleanedCPF = cpf.replace(/\D/g, "");

    if (cleanedCPF.length !== 11 || /^(\d)\1*$/.test(cleanedCPF)) {
      return false;
    }

    const calculateDigit = (digits: string[], factor: number): number => {
      let sum = 0;
      for (let i = 0; i < digits.length; i++) {
        sum += parseInt(digits[i], 10) * factor;
        factor--;
      }
      return sum % 11;
    };

    const digits = Array.from(cleanedCPF);

    const firstDigit = calculateDigit(digits.slice(0, 9), 10);
    if (firstDigit !== parseInt(digits[9], 10)) {
      return false;
    }

    const secondDigit = calculateDigit(digits.slice(0, 10), 11);
    if (secondDigit !== parseInt(digits[10], 10)) {
      return false;
    }

    return true;
  }
}
