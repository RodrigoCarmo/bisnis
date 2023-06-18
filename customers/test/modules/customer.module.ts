import { Module } from "@nestjs/common";
import { ClientController } from "src/app/controllers/customer.controller";
import { CustomerRepositoryMock } from "test/customers/repositories/customer.repository.mock";
import { EncryptMockService } from "test/customers/external-services/encrypt-mock.service";
import { CustomersService } from "src/app/services/customer.service";

@Module({
  imports: [],
  controllers: [ClientController],
  providers: [
    { provide: "ENCRYPT_SERVICE", useClass: EncryptMockService },
    { provide: "CLIENT_REPOSITORY", useClass: CustomerRepositoryMock },
    CustomersService,
  ],
  exports: [],
})
export class CustomersMockModule {}
