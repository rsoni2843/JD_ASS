declare const _default: {
    app: {
        host: string;
        port: number;
    };
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    };
    passwords: {
        salt: number;
    };
    jwt: {
        access_token_secret: string;
    };
};
export default _default;
