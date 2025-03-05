"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addressController_1 = require("../controller/addressController");
const router = express_1.default.Router();
router.get("/get-address/:userId", addressController_1.getUserAddress);
router.post("/create", addressController_1.createAddress);
router.patch("/update/:userId", addressController_1.updateAddress);
exports.default = router;
//# sourceMappingURL=addressRoutes.js.map