"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let UtilsService = class UtilsService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            secure: false,
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: 'rsoni2843@gmail.com',
                pass: 'jfkq fueb pmvy svet',
            },
        });
    }
    async sendEmail(receiverEmail, subject, text) {
        try {
            await this.transporter.sendMail({
                from: 'ABCD XYZ',
                to: receiverEmail,
                subject,
                text,
            });
            return true;
        }
        catch (err) {
            console.log(err);
            throw new common_1.BadRequestException('Error sending OTP');
        }
    }
    getPaginationProps(page, size) {
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
    extractJwtFromRequest(request) {
        const authHeader = request.headers.authorization;
        if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
            return authHeader.split(' ')[1];
        }
        throw new common_1.NotFoundException('Token missing!');
    }
};
UtilsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UtilsService);
exports.UtilsService = UtilsService;
//# sourceMappingURL=utils.service.js.map