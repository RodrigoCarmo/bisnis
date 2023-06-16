import { lastValueFrom } from "rxjs";
import { Injectable } from "@nestjs/common";
import { CustomerHttpAdapter } from "src/infra/http/customer-http.adapter";
import { httpException } from "src/infra/presenters/http-global-exception";
import { CustomerPresenter } from "../presenters/customer.presenter";
import {
  CpfOrEmailDto,
  CreateCustomerDto,
  CustomerIdDto,
  UpdateCustomerDto,
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

  async getById(customerIdDto: CustomerIdDto): Promise<CustomerPresenter> {
    try {
      const { data } = await lastValueFrom(
        this.customerHttpAdapter.getCustomerById(customerIdDto)
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

  async update(
    customerIdDto: CustomerIdDto,
    updateCustomerDto: UpdateCustomerDto
  ): Promise<CustomerPresenter> {
    try {
      const { data } = await lastValueFrom(
        this.customerHttpAdapter.updateCustomer(
          customerIdDto,
          updateCustomerDto
        )
      );

      return data;
    } catch (error) {
      httpException(error);
    }
  }

  async delete(customerIdDto: CustomerIdDto): Promise<void> {
    try {
      const { data } = await lastValueFrom(
        this.customerHttpAdapter.deleteCustomer(customerIdDto)
      );

      return data;
    } catch (error) {
      httpException(error);
    }
  }
}
