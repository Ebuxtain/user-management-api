"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidatorSchema = void 0;
const zod_1 = require("zod");
exports.userValidatorSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name is required" }),
    email: zod_1.z.string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email format" }),
});
exports.default = exports.userValidatorSchema;
//# sourceMappingURL=userValidator.js.map