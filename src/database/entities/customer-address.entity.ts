// customer-address.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class CustomerAddress {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  // @Column()
  // default_billing_address: boolean;

  // @Column()
  // default_shipping_address: boolean;

  @Column()
  pincode: string;

  @Column()
  street: string;

  @Column()
  mobile: string;

  @ManyToOne(() => Customer, (customer) => customer.defaultBillingAddress)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}
