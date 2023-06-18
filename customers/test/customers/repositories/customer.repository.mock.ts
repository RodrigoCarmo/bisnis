import { UpdateCustomerDto } from "src/app/dtos/customer.dto";
import { CustomersModel } from "src/domain/models/customers.model";
import { CustomersRepositoryInterface } from "src/domain/repositories/interfaces/customers-repository.interface";
import { handleCustomerResponse } from "src/infra/database/typeorm/presenters/customers.presenter";

type NotFoundOptions = {
  customer?: CustomersModel;
  launchException?: boolean;
};
type ExistingIdOptions = NotFoundOptions;

export class CustomerRepositoryMock implements CustomersRepositoryInterface {
  customers: CustomersModel[] = [];
  checkException = {
    notFound: ({ customer, launchException = false }: NotFoundOptions) => {
      if (!customer || launchException) throw new Error("Customer not found");

      return customer;
    },
    existingId: ({ customer, launchException }: ExistingIdOptions) => {
      if (this.customers.find((c) => c.id === customer.id) || launchException)
        throw new Error("Customer already exists");
    },
  };

  async createCustomer(
    customer: CustomersModel
  ): Promise<Partial<CustomersModel>> {
    this.checkException.existingId({ customer });
    this.customers.push(customer);
    return handleCustomerResponse(customer);
  }
  async getCustomerById(id: string): Promise<Partial<CustomersModel>> {
    return this.checkException.notFound({
      customer: this.customers.find((c) => c.id === id),
    });
  }
  async getCustomerByEmail(email: string): Promise<Partial<CustomersModel>> {
    return this.checkException.notFound({
      customer: this.customers.find((c) => c.email === email),
    });
  }
  async getCustomerByCpf(cpf: string): Promise<Partial<CustomersModel>> {
    return this.checkException.notFound({
      customer: this.customers.find((c) => c.cpf === cpf),
    });
  }
  async updateCustomer(
    id: string,
    customer: UpdateCustomerDto
  ): Promise<Partial<CustomersModel>> {
    let updatedCustomer: number;

    this.customers.map((c, i) => {
      if (c.id === id) {
        c = { ...c, ...customer };
        updatedCustomer = i;
        return c;
      }
      return c;
    });

    return (
      this.customers[updatedCustomer] ||
      this.checkException.notFound({ launchException: true })
    );
  }
  async deleteCustomer(id: string): Promise<void> {
    const customerToDeleteIndex = this.customers.findIndex((c) => c.id === id);
    this.customers.splice(customerToDeleteIndex, 1);
  }
  async checkCustomerAlreadyRegister(
    email: string,
    cpf: string
  ): Promise<CustomersModel> {
    const customer = this.customers.find(
      (c) => c.email === email || c.cpf === cpf
    );

    return customer;
  }
}
