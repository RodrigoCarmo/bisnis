import { CustomersModel } from 'src/domain/models/customers.model';

export interface CustomersRepositoryInterface {
    createCustomer(customer: CustomersModel): Promise<CustomersModel>;
    getCustomerById(id: string): Promise<CustomersModel | undefined>;
    getCustomerByEmail(email: string): Promise<CustomersModel | undefined>;
    getCustomerByCpf(cpf: string): Promise<CustomersModel | undefined>;
    updateCustomer(
        id: string,
        customer: CustomersModel,
    ): Promise<Partial<CustomersModel>>;
    deleteCustomer(id: string): Promise<void>;
}
