import { Customer } from './customer.entity';
export declare class CustomerAddress {
    id: number;
    firstname: string;
    lastname: string;
    pincode: string;
    street: string;
    mobile: string;
    customer: Customer;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
