import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import {
  CpfOrEmailDto,
  CreateCustomerDto,
  GetCustomerByIdDto,
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
    @Param() getCustomerByIdDto: GetCustomerByIdDto
  ): Promise<CustomerPresenter> {
    return this.customerService.getById(getCustomerByIdDto);
  }
}
