import { lastValueFrom } from "rxjs";
import { Injectable } from "@nestjs/common";
import { CustomerHttpAdapter } from "src/infra/http/customer-http.adapter";
import { httpException } from "src/infra/presenters/http-global-exception";
import { CustomerPresenter } from "../presenters/customer.presenter";
import {
  CpfOrEmailDto,
  CreateCustomerDto,
  GetCustomerByIdDto,
} from "../dtos/customer.dto";

@Injectable()
export class CustomerService {
  constructor(private readonly customerHttpAdapter: CustomerHttpAdapter) {}

  async create(
    createCustomerDto: CreateCustomerDto
  ): Promise<CustomerPresenter> {
    try {
      const { data } = await lastValueFrom(
        this.customerHttpAdapter.createCustomer(createCustomerDto)
      );

      return data;
    } catch (error) {
      httpException(error);
    }
  }

  async getById(
    getCustomerByIdDto: GetCustomerByIdDto
  ): Promise<CustomerPresenter> {
    try {
      const { data } = await lastValueFrom(
        this.customerHttpAdapter.getCustomerById(getCustomerByIdDto)
      );

      return data;
    } catch (error) {
      httpException(error);
    }
  }

  async getByCpfOrEmail(
    cpfOrEmailDto: CpfOrEmailDto
  ): Promise<CustomerPresenter> {
    try {
      const { data } = await lastValueFrom(
        this.customerHttpAdapter.getByCpfOrEmail(cpfOrEmailDto)
      );

      return data;
    } catch (error) {
      httpException(error);
    }
  }
}
