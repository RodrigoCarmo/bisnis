import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
} from "@nestjs/common";
import { HttpExceptionFilter } from "src/utils/http-exception.filter";
import { CustomersService } from "../services/customer.service";
import {
  CpfOrEmailDto,
  CreateCustomerDto,
  CustomerIdDto,
  UpdateCustomerDto,
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
    @Param() customerIdDto: CustomerIdDto
  ): Promise<Partial<CustomersModel>> {
    return await this.customersService.getById(customerIdDto);
  }

  @Put(":id")
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async update(
    @Param() customerIdDto: CustomerIdDto,
    @Body() updateCustomerDto: UpdateCustomerDto
  ): Promise<Partial<CustomersModel>> {
    return await this.customersService.update(customerIdDto, updateCustomerDto);
  }

  @Delete(":id")
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async delete(@Param() customerIdDto: CustomerIdDto): Promise<void> {
    return await this.customersService.delete(customerIdDto);
  }
}
