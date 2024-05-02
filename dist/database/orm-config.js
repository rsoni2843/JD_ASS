"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../config/env");
const path_1 = require("path");
const ormConfig = {
    type: 'postgres',
    host: env_1.default.database.host,
    port: env_1.default.database.port,
    username: env_1.default.database.username,
    password: env_1.default.database.password,
    database: env_1.default.database.database,
    entities: [(0, path_1.join)(__dirname, 'entities', '*.js')],
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
    logging: false,
    synchronize: true,
};
exports.default = ormConfig;
//# sourceMappingURL=orm-config.js.map