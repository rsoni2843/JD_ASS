import { User } from './user.entity';
import { Menu } from './menu.entity';
export declare class EndScreen {
    id: number;
    form_number: string;
    form_name: string;
    location: string;
    path: string;
    is_active: boolean;
    created_by: string;
    updated_by: string;
    users: User[];
    menu: Menu;
    created_at: Date;
    updated_at: Date;
}
