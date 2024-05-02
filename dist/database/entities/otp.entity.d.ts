export declare enum ActionType {
    LOGIN = "login",
    SIGNUP = "signup",
    FORGOT_PASSWORD = "forgot_password",
    EMAIL_UPDATE = "email_update",
    MOBILE_UPDATE = "mobile_update"
}
export declare enum OtpType {
    MOBILE = "mobile",
    EMAIL = "email"
}
export declare class Otp {
    id: number;
    type: OtpType;
    code: string;
    value: string;
    action_type: ActionType;
    createdAt: Date;
    updatedAt: Date;
}
