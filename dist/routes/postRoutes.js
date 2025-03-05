"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controller/postController");
const router = express_1.default.Router();
router.get("/get-post/:userId", postController_1.getUserPosts);
router.post("/create", postController_1.createPost);
router.delete("/delete/:id", postController_1.deletePost);
exports.default = router;
//# sourceMappingURL=postRoutes.js.map