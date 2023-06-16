import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  CpfOrEmailDto,
  CreateCustomerDto,
  CustomerIdDto,
  UpdateCustomerDto,
} from "src/app/dtos/customer.dto";

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

  getCustomerById(customerIdDto: CustomerIdDto) {
    return this.httpService.get(`${this.url}/customers/${customerIdDto.id}`);
  }

  getByCpfOrEmail(cpfOrEmailDto: CpfOrEmailDto) {
    const objQuery = {
      queryName: "",
      query: "",
    };

    if (cpfOrEmailDto.cpf) {
      objQuery.queryName = `${Object.keys(cpfOrEmailDto).filter(
        (key) => key === "cpf"
      )}`;
      objQuery.query = `${cpfOrEmailDto.cpf}`;
    } else if (cpfOrEmailDto.email) {
      objQuery.queryName = `${Object.keys(cpfOrEmailDto).filter(
        (key) => key === "email"
      )}`;
      objQuery.query = `${cpfOrEmailDto.email}`;
    }

    return this.httpService.get(
      `${this.url}/customers?${objQuery.queryName}=${objQuery.query}`
    );
  }

  updateCustomer(
    customerIdDto: CustomerIdDto,
    updateCustomerDto: UpdateCustomerDto
  ) {
    return this.httpService.put(
      `${this.url}/customers/${customerIdDto.id}`,
      updateCustomerDto
    );
  }

  deleteCustomer(customerIdDto: CustomerIdDto) {
    return this.httpService.delete(`${this.url}/customers/${customerIdDto.id}`);
  }
}
