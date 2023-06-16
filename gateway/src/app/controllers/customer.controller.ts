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
} from "@nestjs/common";
import {
  CpfOrEmailDto,
  CreateCustomerDto,
  CustomerIdDto,
  UpdateCustomerDto,
} from "../dtos/customer.dto";
import { CustomerService } from "../services/customer.service";
import { CustomerPresenter } from "../presenters/customer.presenter";

@Controller("customers")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() createCustomerDto: CreateCustomerDto
  ): Promise<CustomerPresenter> {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  @HttpCode(200)
  async getByCpfOrEmail(
    @Query() cpfOrEmailDto: CpfOrEmailDto
  ): Promise<CustomerPresenter> {
    return this.customerService.getByCpfOrEmail(cpfOrEmailDto);
  }

  @Get(":id")
  @HttpCode(200)
  async getById(
    @Param() customerIdDto: CustomerIdDto
  ): Promise<CustomerPresenter> {
    return this.customerService.getById(customerIdDto);
  }

  @Put(":id")
  @HttpCode(200)
  async update(
    @Param() customerIdDto: CustomerIdDto,
    @Body() updateCustomerDto: UpdateCustomerDto
  ): Promise<CustomerPresenter> {
    return this.customerService.update(customerIdDto, updateCustomerDto);
  }

  @Delete(":id")
  @HttpCode(200)
  async delete(@Param() customerIdDto: CustomerIdDto): Promise<void> {
    return this.customerService.delete(customerIdDto);
  }
}
