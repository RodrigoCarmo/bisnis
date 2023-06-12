import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CustomerModule } from "./modules/customer.module";

@Module({
  imports: [ConfigModule.forRoot(), CustomerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
