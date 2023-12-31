import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { CustomersEntity } from "../entities/customers.entity";
import { CustomersAddressEntity } from "../entities/customers-address.entity";
import { NestFactory } from "@nestjs/core";

export const dataSourceConfig = (
  configService: ConfigService
): DataSourceOptions => ({
  type: "postgres",
  host: configService.get("HOST_PG"),
  port: +configService.get("PORT_PG"),
  username: configService.get("USERNAME_PG"),
  password: configService.get("PASSWORD_PG"),
  database: configService.get("DATABASE_PG"),
  entities: [CustomersEntity, CustomersAddressEntity],
  migrations: ["dist/infra/database/typeorm/migrations/*.js"],
});

async function dataSourceOptions(): Promise<DataSourceOptions> {
  const app = await NestFactory.createApplicationContext(
    ConfigModule.forRoot()
  );
  const configService = app.get(ConfigService);

  return dataSourceConfig(configService);
}

const datasource = dataSourceOptions()
  .then((dataSource) => {
    return new DataSource(dataSource);
  })
  .catch((error) => console.error(error));

export default datasource;
