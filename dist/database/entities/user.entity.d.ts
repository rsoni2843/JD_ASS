import { Role } from './role.entity';
import { EndScreen } from './end-screen.entity';
import { Token } from './token.entity';
export declare class User {
    id: number;
    username: string;
    password_hash: string;
    firstname: string;
    lastname: string;
    email: string;
    mobile: string;
    is_active: boolean;
    last_logged_in: Date;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    roles: Role[];
    endScreens: EndScreen[];
    tokens: Token[];
    constructor(input?: Partial<User>);
}
