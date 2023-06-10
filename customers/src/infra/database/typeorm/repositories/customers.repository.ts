import { BaseRepository } from 'src/infra/database/typeorm/repositories/base.repository';
import { InjectRepository } from '@nestjs/typeorm';

import { CustomersEntity } from 'src/infra/database/typeorm/entities/customers.entity';
import { CustomersModel } from 'src/domain/models/customers.model';
import { Injectable } from '@nestjs/common';
import { CustomersRepositoryInterface } from 'src/domain/repositories/interfaces/customers-repository.interface';

@Injectable()
export class CustomersRepository implements CustomersRepositoryInterface {
    constructor(
        @InjectRepository(CustomersEntity)
        private readonly customersRepository: BaseRepository<CustomersEntity>,
    ) {}
    async createCustomer(customers: CustomersModel): Promise<CustomersModel> {
        return this.customersRepository.save(
            this.customersRepository.create(customers),
        );
    }
    async getCustomerById(id: string): Promise<CustomersModel> {
        return this.customersRepository.findOneBy({ id });
    }
    async getCustomerByEmail(email: string): Promise<CustomersModel> {
        return this.customersRepository.findOneBy({ email });
    }

    async getCustomerByCpf(cpf: string): Promise<CustomersModel> {
        return this.customersRepository.findOneBy({ cpf });
    }

    async updateCustomer(
        id: string,
        customers: CustomersModel,
    ): Promise<Partial<CustomersModel>> {
        const { raw: updatedCustomer } = await this.customersRepository
            .createQueryBuilder()
            .update()
            .set(customers)
            .where('id = :id', { id })
            .returning(['first_name', 'last_name', 'phone'])
            .execute();

        return updatedCustomer[0] as CustomersModel;
    }
    async deleteCustomer(id: string): Promise<void> {
        await this.customersRepository.delete(id);
    }
}
