import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CustomerModule } from "./modules/customer.module";
import { ThrottlerModule } from "@nestjs/throttler";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ,
    CustomerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
