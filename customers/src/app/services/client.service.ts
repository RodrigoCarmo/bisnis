import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateClientDto } from "../dtos/client.dto";
import { EcryptInterface } from "src/infra/external-services/interfaces/encrypt.interface";
import { CustomersModel } from "src/domain/models/customers.model";
import { CustomersRepositoryInterface } from "src/domain/repositories/interfaces/customers-repository.interface";

@Injectable()
export class ClientService {
  constructor(
    @Inject("CLIENT_REPOSITORY")
    private customersRepository: CustomersRepositoryInterface,
    @Inject("ENCRYPT_SERVICE")
    private readonly encryptService: EcryptInterface
  ) {}
  async create(createClientDto: CreateClientDto): Promise<CustomersModel> {
    if (
      (await this.customersRepository.getCustomerByEmail(
        createClientDto.email
      )) ||
      (await this.customersRepository.getCustomerByCpf(createClientDto.cpf))
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
}
