import { Body, Controller, HttpCode, Post, UseFilters } from "@nestjs/common";
import { CreateClientDto } from "src/app/dtos/client.dto";
import { HttpExceptionFilter } from "src/utils/http-exception.filter";
import { ClientService } from "../services/client.service";

@Controller("clients")
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @HttpCode(201)
  @UseFilters(new HttpExceptionFilter())
  async create(@Body() createClientDto: CreateClientDto): Promise<any> {
    return await this.clientService.create(createClientDto);
  }
}
