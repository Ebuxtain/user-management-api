"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    storage: "./database.sqlite",
    dialect: "sqlite",
    logging: false,
    define: {
        timestamps: true,
    },
});
exports.default = sequelize;
//# sourceMappingURL=database.config.js.map