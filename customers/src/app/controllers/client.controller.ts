import { Body, Controller, HttpCode, Post, UseFilters } from "@nestjs/common";
import { HttpExceptionFilter } from "src/utils/http-exception.filter";
import { ClientService } from "../services/client.service";
import { CreateCustomerDto } from "../dtos/customer.dto";

@Controller("customers")
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @HttpCode(201)
  @UseFilters(new HttpExceptionFilter())
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<any> {
    return await this.clientService.create(createCustomerDto);
  }
}
