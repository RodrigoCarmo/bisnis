import { Module } from "@nestjs/common";
import { CustomerService } from "../services/customer.service";
import { CustomerController } from "../controllers/customer.controller";
import { HttpModule } from "@nestjs/axios";
import { CustomerHttpAdapter } from "src/infra/http/customer-http.adapter";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [HttpModule],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerHttpAdapter, ConfigService],
})
export class CustomerModule {}
