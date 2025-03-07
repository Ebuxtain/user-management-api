"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_config_1 = __importDefault(require("./database/database.config"));
const PORT = 4000;
const server = app_1.default.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Graceful Shutdown (Handles Process Kill Events)
process.on("SIGTERM", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("⚠️ Shutting down server...");
    server.close(() => {
        console.log("Server shut down gracefully.");
        process.exit(0);
    });
}));
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("⚠️ Process interrupted. Closing server...");
    server.close(() => process.exit(0));
}));
database_config_1.default.sync()
    .then(() => {
    console.log(`Database connected successfully`);
})
    .catch((err) => {
    console.log(err);
});
exports.default = app_1.default;
//# sourceMappingURL=server.js.map