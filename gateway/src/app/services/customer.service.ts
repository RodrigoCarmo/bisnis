import { lastValueFrom } from "rxjs";
import { CreateCustomerDto } from "../dtos/customer.dto";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CustomerHttpAdapter } from "src/infra/http/customer-http.adapter";
import { httpException } from "src/infra/presenters/http-global-exception";

@Injectable()
export class CustomerService {
  constructor(private readonly customerHttpAdapter: CustomerHttpAdapter) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<any> {
    try {
      const { data } = await lastValueFrom(
        this.customerHttpAdapter.createCustomer(createCustomerDto)
      );

      return data;
    } catch (error) {
      httpException(error);
    }
  }
}
