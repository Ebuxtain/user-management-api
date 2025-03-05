"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressInstance = exports.UserInstance = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
exports.UserInstance = userModel_1.default;
const addressModel_1 = __importDefault(require("../models/addressModel"));
exports.AddressInstance = addressModel_1.default;
// Define associations here to prevent circular dependency issues
userModel_1.default.hasOne(addressModel_1.default, { foreignKey: "userId", as: "address" });
addressModel_1.default.belongsTo(userModel_1.default, { foreignKey: "userId", as: "user" });
//# sourceMappingURL=association.js.map