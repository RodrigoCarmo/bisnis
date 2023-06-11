import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({ prefix: "1", type: 0 });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}
bootstrap();
