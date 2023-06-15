import { CustomersModel } from "src/domain/models/customers.model";

export interface CustomersRepositoryInterface {
  createCustomer(customer: CustomersModel): Promise<Partial<CustomersModel>>;
  getCustomerById(id: string): Promise<Partial<CustomersModel> | undefined>;
  getCustomerByEmail(
    email: string
  ): Promise<Partial<CustomersModel> | undefined>;
  getCustomerByCpf(cpf: string): Promise<Partial<CustomersModel> | undefined>;
  updateCustomer(
    id: string,
    customer: CustomersModel
  ): Promise<Partial<CustomersModel>>;
  deleteCustomer(id: string): Promise<void>;
  checkCustomerAlreadyRegister(
    email: string,
    cpf: string
  ): Promise<CustomersModel | undefined>;
}
