import { BaseRepository } from "src/infra/database/typeorm/repositories/base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { ClientAddressRepositoryInterface } from "../../../../domain/repositories/interfaces/customers-address-repository.interface";
import { CustomersAddressModel } from "../../../../domain/models/customers-address.model";
import { CustomersAddressEntity } from "src/infra/database/typeorm/entities/customers-address.entity";

@Injectable()
export class ClientAddressRepository
  implements ClientAddressRepositoryInterface
{
  constructor(
    @InjectRepository(CustomersAddressEntity)
    private readonly clientAddressRepository: BaseRepository<CustomersAddressEntity>
  ) {}
  async createClientAddress(
    client: CustomersAddressModel
  ): Promise<CustomersAddressModel> {
    return this.clientAddressRepository.save(
      this.clientAddressRepository.create(client)
    );
  }
  async getClientClientAddressById(id: string): Promise<CustomersAddressModel> {
    return this.clientAddressRepository.findOneBy({ id });
  }
  async updateClientAddressClient(
    id: string,
    client: CustomersAddressModel
  ): Promise<CustomersAddressModel> {
    await this.clientAddressRepository.update(id, client);
    return this.getClientClientAddressById(id);
  }
  async deleteClientAddress(id: string): Promise<void> {
    await this.clientAddressRepository.delete(id);
  }
}
