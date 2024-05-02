import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaginationProps } from './types';
import * as nodemailer from 'nodemailer';

@Injectable()
export class UtilsService {
  private readonly transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      secure: false, // false for TLS
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: 'rsoni2843@gmail.com',
        pass: 'jfkq fueb pmvy svet',
      },
    });
  }

  async sendEmail(
    receiverEmail: string,
    subject: string,
    text: string,
  ): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: 'ABCD XYZ',
        // from: '2rsoni2843@gmail.com',
        to: receiverEmail,
        subject,
        text,
      });
      return true;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Error sending OTP');
    }
  }

  getPaginationProps(page: number, size: number): PaginationProps {
    const pageNumber = page || 1;
    const rowsPerPage = size || 20;
    const skip = (pageNumber - 1) * rowsPerPage;

    return {
      filter: {
        skip,
        take: rowsPerPage,
      },
      currentPage: page,
    };
  }

  extractJwtFromRequest(request: any): string | null {
    const authHeader = request.headers.authorization;

    if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
      return authHeader.split(' ')[1];
    }

    throw new NotFoundException('Token missing!');
  }
}
