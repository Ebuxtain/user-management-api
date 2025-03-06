"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize({
    storage: "./database.sqlite",
    dialect: "sqlite",
    logging: false,
    define: {
        timestamps: true,
    },
});
exports.default = db;
//# sourceMappingURL=database.config.js.map