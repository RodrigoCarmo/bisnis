import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseRepository } from "src/infra/database/typeorm/repositories/base.repository";
import { ClientController } from "../controllers/customer.controller";
import { Bcrypt } from "src/infra/external-services/bcrypt";
import { CustomersEntity } from "src/infra/database/typeorm/entities/customers.entity";
import { CustomersRepository } from "src/infra/database/typeorm/repositories/customers.repository";
import { CustomersService } from "../services/customer.service";

@Module({
  imports: [TypeOrmModule.forFeature([CustomersEntity])],
  controllers: [ClientController],
  providers: [
    BaseRepository,
    CustomersService,
    CustomersRepository,
    { provide: "ENCRYPT_SERVICE", useClass: Bcrypt },
    { provide: "CLIENT_REPOSITORY", useClass: CustomersRepository },
  ],
  exports: [TypeOrmModule],
})
export class CustomersModule {}
