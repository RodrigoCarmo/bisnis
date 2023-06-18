import { EncryptInterface } from "src/infra/external-services/interfaces/encrypt.interface";

export class EncryptMockService implements EncryptInterface {
  async encryptPassword(password: string): Promise<string> {
    return password;
  }
  async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return password === hashedPassword;
  }
}
