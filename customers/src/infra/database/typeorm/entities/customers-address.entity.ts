import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import * as moment from "moment-timezone";
import { CustomersAddressModel } from "src/domain/models/customers-address.model";
import { CustomersEntity } from "./customers.entity";

@Entity("customers_address")
export class CustomersAddressEntity implements CustomersAddressModel {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  neighborhood: string;

  @Column()
  cep: string;

  @OneToOne(
    () => CustomersEntity,
    (customer: CustomersEntity) => customer.addressId
  )
  customer: CustomersEntity;

  @Column()
  city: string;

  @Column()
  state: string;

  @CreateDateColumn({
    type: "timestamp",
    default: moment().tz("America/Sao_Paulo").format(),
    name: "created_at",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: moment().tz("America/Sao_Paulo").format(),
    name: "updated_at",
  })
  updatedAt: Date;
}
