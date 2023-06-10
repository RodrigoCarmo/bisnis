import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCustomersAndAddress1686429503517
  implements MigrationInterface
{
  name = "CreateCustomersAndAddress1686429503517";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customers_address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying NOT NULL, "number" character varying NOT NULL, "neighborhood" character varying NOT NULL, "cep" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT '2023-06-10T17:38:23-03:00', "updated_at" TIMESTAMP NOT NULL DEFAULT '2023-06-10T17:38:23-03:00', CONSTRAINT "PK_2441e5a7e71f5dc216fa2f96feb" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "cpf" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT '2023-06-10T17:38:23-03:00', "updated_at" TIMESTAMP NOT NULL DEFAULT '2023-06-10T17:38:23-03:00', "addressIdId" uuid, CONSTRAINT "UQ_413de651cfd9c576b99cec83fd3" UNIQUE ("cpf"), CONSTRAINT "REL_6bdc3423f5c4dcea4c11a867b3" UNIQUE ("addressIdId"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD CONSTRAINT "FK_6bdc3423f5c4dcea4c11a867b3b" FOREIGN KEY ("addressIdId") REFERENCES "customers_address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customers" DROP CONSTRAINT "FK_6bdc3423f5c4dcea4c11a867b3b"`
    );
    await queryRunner.query(`DROP TABLE "customers"`);
    await queryRunner.query(`DROP TABLE "customers_address"`);
  }
}
