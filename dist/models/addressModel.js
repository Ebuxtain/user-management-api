"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../database/database.config"));
const userModel_1 = __importDefault(require("./userModel"));
class AddressInstance extends sequelize_1.Model {
}
exports.AddressInstance = AddressInstance;
AddressInstance.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: userModel_1.default,
            key: "id",
        },
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_config_1.default,
    tableName: "addresses",
    timestamps: true,
});
userModel_1.default.hasOne(AddressInstance, {
    foreignKey: "userId",
    as: "address",
});
AddressInstance.belongsTo(userModel_1.default, {
    foreignKey: "userId",
    as: "user",
});
exports.default = AddressInstance;
//# sourceMappingURL=addressModel.js.map