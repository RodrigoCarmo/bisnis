import { BaseRepository } from "src/infra/database/typeorm/repositories/base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomersEntity } from "src/infra/database/typeorm/entities/customers.entity";
import { CustomersModel } from "src/domain/models/customers.model";
import { Injectable } from "@nestjs/common";
import { CustomersRepositoryInterface } from "src/domain/repositories/interfaces/customers-repository.interface";
import { handleCustomerResponse } from "../presenters/customers.presenter";
import { UpdateCustomerDto } from "src/app/dtos/customer.dto";

@Injectable()
export class CustomersRepository implements CustomersRepositoryInterface {
  constructor(
    @InjectRepository(CustomersEntity)
    private readonly customersRepository: BaseRepository<CustomersEntity>
  ) {}
  async createCustomer(
    customer: CustomersModel
  ): Promise<Partial<CustomersModel>> {
    return handleCustomerResponse(
      await this.customersRepository.save(
        this.customersRepository.create(customer)
      )
    );
  }
  async getCustomerById(
    id: string
  ): Promise<Partial<CustomersModel> | undefined> {
    return handleCustomerResponse(
      await this.customersRepository
        .createQueryBuilder("customer")
        .where("customer.id = :id", { id })
        .getOne()
    );
  }
  async getCustomerByEmail(
    email: string
  ): Promise<Partial<CustomersModel> | undefined> {
    return handleCustomerResponse(
      await this.customersRepository
        .createQueryBuilder("customer")
        .where("customer.email = :email", { email })
        .getOne()
    );
  }

  async getCustomerByCpf(
    cpf: string
  ): Promise<Partial<CustomersModel> | undefined> {
    return handleCustomerResponse(
      await this.customersRepository
        .createQueryBuilder("customer")
        .where("customer.cpf = :cpf", { cpf })
        .getOne()
    );
  }

  async updateCustomer(
    id: string,
    customers: CustomersModel
  ): Promise<Partial<CustomersModel>> {
    const customerToUpdate = customers as UpdateCustomerDto;
    const { raw: updatedCustomer } = await this.customersRepository
      .createQueryBuilder()
      .update()
      .set(customerToUpdate)
      .where("id = :id", { id })
      .returning("*")
      .execute();

    return handleCustomerResponse(updatedCustomer);
  }
  async deleteCustomer(id: string): Promise<void> {
    await this.customersRepository.delete(id);
  }
  async checkCustomerAlreadyRegister(
    email: string,
    cpf: string
  ): Promise<CustomersModel | undefined> {
    return this.customersRepository.findOne({ where: [{ email }, { cpf }] });
  }
}
