import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseFilters,
} from "@nestjs/common";
import { HttpExceptionFilter } from "src/utils/http-exception.filter";
import { CustomersService } from "../services/client.service";
import {
  CpfOrEmailDto,
  CreateCustomerDto,
  GetCustomerByIdDto,
} from "../dtos/customer.dto";
import { CustomersModel } from "src/domain/models/customers.model";

@Controller("customers")
export class ClientController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @HttpCode(201)
  @UseFilters(new HttpExceptionFilter())
  async create(
    @Body() createCustomerDto: CreateCustomerDto
  ): Promise<Partial<CustomersModel>> {
    return await this.customersService.create(createCustomerDto);
  }

  @Get()
  @HttpCode(200)
  async getByCpfOrEmail(
    @Query() cpfOrEmailDto: CpfOrEmailDto
  ): Promise<Partial<CustomersModel>> {
    return this.customersService.getByCpfOrEmail(cpfOrEmailDto);
  }

  @Get(":id")
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async getById(
    @Param() getCustomerByIdDto: GetCustomerByIdDto
  ): Promise<Partial<CustomersModel>> {
    return await this.customersService.getById(getCustomerByIdDto);
  }
}
