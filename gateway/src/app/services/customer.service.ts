import { lastValueFrom } from "rxjs";
import { CreateCustomerDto } from "../dtos/customer.dto";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CustomerHttpAdapter } from "src/infra/http/customer-http.adapter";

@Injectable()
export class CustomerService {
  constructor(private readonly customerHttpAdapter: CustomerHttpAdapter) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.customerHttpAdapter.createCustomer(createCustomerDto)
      );
      return response;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
