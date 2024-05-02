import { User } from './user.entity';
export declare class Role {
    id: number;
    role_name: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
    users: User[];
}
