"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidatorSchema = void 0;
const zod_1 = require("zod");
exports.postValidatorSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: "Title is required" }),
    body: zod_1.z.string().min(1, { message: "Body is required" }),
    userId: zod_1.z.number().min(1, { message: "Valid User ID is required" }),
});
exports.default = exports.postValidatorSchema;
//# sourceMappingURL=PostValidators.js.map