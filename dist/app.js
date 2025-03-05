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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_config_1 = __importDefault(require("./database/database.config"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const addressRoutes_1 = __importDefault(require("./routes/addressRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// db connection
database_config_1.default.sync()
    .then(() => {
    console.log(`Database connected successfully`);
})
    .catch((err) => {
    console.log(err);
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/api", userRoutes_1.default);
app.use("/posts", postRoutes_1.default);
app.use("/address", addressRoutes_1.default);
// start Server
const PORT = 5000;
const server = app.listen(PORT, () => {
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
exports.default = app;
//# sourceMappingURL=app.js.map