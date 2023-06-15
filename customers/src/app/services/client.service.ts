import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { EcryptInterface } from "src/infra/external-services/interfaces/encrypt.interface";
import { CustomersModel } from "src/domain/models/customers.model";
import { CustomersRepositoryInterface } from "src/domain/repositories/interfaces/customers-repository.interface";
import {
  CpfOrEmailDto,
  CreateCustomerDto,
  GetCustomerByIdDto,
} from "../dtos/customer.dto";

@Injectable()
export class CustomersService {
  constructor(
    @Inject("CLIENT_REPOSITORY")
    private customersRepository: CustomersRepositoryInterface,
    @Inject("ENCRYPT_SERVICE")
    private readonly encryptService: EcryptInterface
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
        "This client already exists for this, please check the cpf or email",
        HttpStatus.CONFLICT
      );
    createClientDto.password = await this.encryptService.encryptPassword(
      createClientDto.password
    );
    return this.customersRepository.createCustomer(createClientDto);
  }

  async getById(
    getCustomerByIdDto: GetCustomerByIdDto
  ): Promise<Partial<CustomersModel>> {
    const customer = await this.customersRepository.getCustomerById(
      getCustomerByIdDto.id
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
}
