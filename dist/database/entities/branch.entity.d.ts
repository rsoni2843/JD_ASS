import { Customer } from './customer.entity';
export declare class Branch {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    mobile: string;
    email: string;
    customers: Customer[];
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
