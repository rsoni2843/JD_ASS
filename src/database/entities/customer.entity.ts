// customer.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { CustomerAddress } from './customer-address.entity';
import { Branch } from './branch.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @OneToOne(() => CustomerAddress)
  @JoinColumn({ name: 'default_billing_address_id' })
  defaultBillingAddress: CustomerAddress;

  @OneToOne(() => CustomerAddress)
  @JoinColumn({ name: 'default_shipping_address_id' })
  defaultShippingAddress: CustomerAddress;

  @OneToMany(
    () => CustomerAddress,
    (customerAddress) => customerAddress.customer,
    {
      cascade: true,
    },
  )
  addresses: CustomerAddress[];

  @ManyToOne(() => Branch, (branch) => branch.customers)
  branch: Branch;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
