import { User } from './user.entity';
export declare class Token {
    id: number;
    token: string;
    user_id: number;
    revoked: boolean;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
