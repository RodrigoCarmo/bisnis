import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CreateCustomerDto } from "src/app/dtos/customer.dto";

@Injectable()
export class CustomerHttpAdapter {
  private url: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.url = this.configService.get("CUSTOMER_URL");
  }

  createCustomer(createCustomerDto: CreateCustomerDto) {
    return this.httpService.post(`${this.url}/customers`, createCustomerDto);
  }
}
