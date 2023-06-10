import { CustomersAddressModel } from 'src/domain/models/customers-address.model';

export interface ClientAddressRepositoryInterface {
    createClientAddress(
        address: CustomersAddressModel,
    ): Promise<CustomersAddressModel>;
    getClientClientAddressById(
        clientId: string,
    ): Promise<CustomersAddressModel | undefined>;
    updateClientAddressClient(
        id: string,
        address: CustomersAddressModel,
    ): Promise<CustomersAddressModel>;
    deleteClientAddress(id: string): Promise<void>;
}
