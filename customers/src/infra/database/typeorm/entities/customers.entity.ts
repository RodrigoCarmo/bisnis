import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import * as moment from "moment-timezone";
import { CustomersAddressEntity } from "./customers-address.entity";
import { CustomersModel } from "src/domain/models/customers.model";

@Entity("customers")
export class CustomersEntity implements CustomersModel {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  email: string;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @OneToOne(() => CustomersAddressEntity)
  @JoinColumn()
  addressId?: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column({ unique: true })
  cpf: string;

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
