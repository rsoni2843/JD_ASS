import { FindOperator } from 'typeorm';
export default interface filterProps {
    username?: FindOperator<string>;
    firstname?: FindOperator<string>;
    lastname?: FindOperator<string>;
    email?: string;
    mobile?: string;
}
