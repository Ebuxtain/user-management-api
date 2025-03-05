"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../database/database.config"));
const userModel_1 = __importDefault(require("./userModel"));
class PostInstance extends sequelize_1.Model {
}
exports.PostInstance = PostInstance;
PostInstance.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: sequelize_1.DataTypes.TEXT,
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
}, {
    sequelize: database_config_1.default,
    tableName: "posts",
    timestamps: true,
});
userModel_1.default.hasMany(PostInstance, {
    foreignKey: "userId",
    as: "posts",
});
PostInstance.belongsTo(userModel_1.default, {
    foreignKey: "userId",
    as: "user",
});
exports.default = PostInstance;
//# sourceMappingURL=postModel.js.map