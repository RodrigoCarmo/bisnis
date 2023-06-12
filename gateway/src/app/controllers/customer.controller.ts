import { Body, Controller, HttpCode, Post, UseFilters } from "@nestjs/common";
import { HttpExceptionFilter } from "../utils/http-exception.filter";
import { CreateCustomerDto } from "../dtos/customer.dto";
import { CustomerService } from "../services/customer.service";

@Controller("customers")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @HttpCode(201)
  @UseFilters(new HttpExceptionFilter())
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<any> {
    return this.customerService.create(createCustomerDto);
  }
}
