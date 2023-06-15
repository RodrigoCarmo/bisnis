export type CreateCustomerDto = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  cpf: string;
};

export type GetCustomerByIdDto = {
  id: string;
};

export class CpfOrEmailDto {
  cpf?: string;
  email?: string;
}
