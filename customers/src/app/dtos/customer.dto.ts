export type CreateCustomerDto = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  cpf: string;
};

export type CustomerIdDto = {
  id: string;
};

export class CpfOrEmailDto {
  cpf?: string;
  email?: string;
}

export type UpdateCustomerDto = {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  password?: string;
};
