import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CustomersMockModule } from "./customer.module";

@Module({
  imports: [CustomersMockModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModuleMock {}
