"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controller/usersController");
const router = (0, express_1.Router)();
router.post("/", usersController_1.createUser);
router.get("/", usersController_1.getPaginatedUsers);
router.get("/count", usersController_1.getUsersCount);
router.get("/:id", usersController_1.getUserById);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map