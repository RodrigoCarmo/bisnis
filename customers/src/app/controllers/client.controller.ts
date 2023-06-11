import { Controller, UseFilters } from "@nestjs/common";
import { HttpExceptionFilter } from "src/utils/http-exception.filter";
import { ClientService } from "../services/client.service";
import { CreateCustomerDto } from "../dtos/customer.dto";
import { MessagePattern } from "@nestjs/microservices";
import { CustomersModel } from "src/domain/models/customers.model";

@Controller()
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @UseFilters(new HttpExceptionFilter())
  @MessagePattern({ cmd: "create_customer" })
  async create(
    createCustomerDto: CreateCustomerDto
  ): Promise<Partial<CustomersModel>> {
    return await this.clientService.create(createCustomerDto);
  }
}
