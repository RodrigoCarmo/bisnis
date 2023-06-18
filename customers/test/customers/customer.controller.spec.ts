import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModuleMock } from "test/modules/app.module";
import { CustomersModel } from "src/domain/models/customers.model";
import { v4 } from "uuid";

describe("AppController (integration)", () => {
  let app: INestApplication;
  const customers: CustomersModel[] = [
    {
      id: v4(),
      email: "teste1@test.com",
      firstName: "joao",
      lastName: "silva",
      password: "12345678",
      phone: "11999999999",
      cpf: "62009549090",
    },
    {
      id: v4(),
      email: "teste2@test.com",
      firstName: "joao",
      lastName: "silva",
      password: "12345678",
      phone: "11999999999",
      cpf: "87545525086",
    },
  ];

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModuleMock],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it("/customers (POST) should be able to create a new client", async () => {
    const [customer, ..._] = customers;
    await request(app.getHttpServer())
      .post("/customers")
      .send(customer)
      .expect(201)
      .expect({
        id: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
      });
  });
});
