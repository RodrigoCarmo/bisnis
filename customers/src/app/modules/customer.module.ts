import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseRepository } from "src/infra/database/typeorm/repositories/base.repository";
import { ClientController } from "../controllers/customer.controller";
import { ClientService } from "../services/client.service";
import { Bcrypt } from "src/infra/external-services/bcrypt";
import { CustomersEntity } from "src/infra/database/typeorm/entities/customers.entity";
import { CustomersRepository } from "src/infra/database/typeorm/repositories/customers.repository";

@Module({
  imports: [TypeOrmModule.forFeature([CustomersEntity])],
  controllers: [ClientController],
  providers: [
    BaseRepository,
    ClientService,
    CustomersRepository,
    { provide: "ENCRYPT_SERVICE", useClass: Bcrypt },
    { provide: "CLIENT_REPOSITORY", useClass: CustomersRepository },
  ],
  exports: [TypeOrmModule],
})
export class CustomersModule {}
