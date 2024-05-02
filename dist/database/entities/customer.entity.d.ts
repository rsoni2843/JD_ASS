import { CustomerAddress } from './customer-address.entity';
import { Branch } from './branch.entity';
export declare class Customer {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    mobile: string;
    defaultBillingAddress: CustomerAddress;
    defaultShippingAddress: CustomerAddress;
    addresses: CustomerAddress[];
    branch: Branch;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
