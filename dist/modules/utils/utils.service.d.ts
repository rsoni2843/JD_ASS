import { PaginationProps } from './types';
export declare class UtilsService {
    private readonly transporter;
    constructor();
    sendEmail(receiverEmail: string, subject: string, text: string): Promise<boolean>;
    getPaginationProps(page: number, size: number): PaginationProps;
    extractJwtFromRequest(request: any): string | null;
}
