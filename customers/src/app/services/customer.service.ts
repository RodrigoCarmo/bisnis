import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CustomersModel } from "src/domain/models/customers.model";
import { CustomersRepositoryInterface } from "src/domain/repositories/interfaces/customers-repository.interface";
import {
  CpfOrEmailDto,
  CreateCustomerDto,
  CustomerIdDto,
  UpdateCustomerDto,
} from "../dtos/customer.dto";
import { EncryptInterface } from "src/infra/external-services/interfaces/encrypt.interface";

@Injectable()
export class CustomersService {
  constructor(
    @Inject("CLIENT_REPOSITORY")
    private customersRepository: CustomersRepositoryInterface,
    @Inject("ENCRYPT_SERVICE")
    private readonly encryptService: EncryptInterface
  ) {}
  async create(
    createClientDto: CreateCustomerDto
  ): Promise<Partial<CustomersModel>> {
    if (
      await this.customersRepository.checkCustomerAlreadyRegister(
        createClientDto.email,
        createClientDto.cpf
      )
    )
      throw new HttpException(
        "This customer already exists with this cpf or email",
        HttpStatus.CONFLICT
      );
    createClientDto.password = await this.encryptService.encryptPassword(
      createClientDto.password
    );
    return this.customersRepository.createCustomer(createClientDto);
  }

  async getById(
    customerIdDto: CustomerIdDto
  ): Promise<Partial<CustomersModel>> {
    const customer = await this.customersRepository.getCustomerById(
      customerIdDto.id
    );

    if (!customer)
      throw new HttpException("Customer not found", HttpStatus.NOT_FOUND);

    return customer;
  }

  async getByCpfOrEmail(
    cpfOrEmailDto: CpfOrEmailDto
  ): Promise<Partial<CustomersModel>> {
    try {
      const customer = cpfOrEmailDto.cpf
        ? await this.customersRepository.getCustomerByCpf(cpfOrEmailDto.cpf)
        : await this.customersRepository.getCustomerByEmail(
            cpfOrEmailDto.email
          );

      if (!customer)
        throw new HttpException("Customer not found", HttpStatus.NOT_FOUND);

      return customer;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    customerIdDto: CustomerIdDto,
    updateCustomerDto: UpdateCustomerDto
  ): Promise<Partial<CustomersModel>> {
    try {
      if (updateCustomerDto.password) {
        updateCustomerDto.password = await this.encryptService.encryptPassword(
          updateCustomerDto.password
        );
      }

      if (updateCustomerDto.email) {
        const email = await this.customersRepository.getCustomerByEmail(
          updateCustomerDto.email
        );

        if (email)
          throw new HttpException(
            "This email already in used",
            HttpStatus.CONFLICT
          );
      }
      return this.customersRepository.updateCustomer(
        customerIdDto.id,
        updateCustomerDto
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(customerIdDto: CustomerIdDto): Promise<void> {
    return this.customersRepository.deleteCustomer(customerIdDto.id);
  }
}
