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
exports.createUser = exports.getUserById = exports.getUsersCount = exports.getUsers = void 0;
const userModel_1 = require("../models/userModel");
const addressModel_1 = __importDefault(require("../models/addressModel"));
const userValidator_1 = __importDefault(require("../validators/userValidator"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageNumber = parseInt(req.query.pageNumber, 10) || 0;
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const offset = pageNumber * pageSize;
        const users = yield userModel_1.UserInstance.findAndCountAll({
            limit: pageSize,
            offset,
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({
            totalUsers: users.count,
            totalPages: Math.ceil(users.count / pageSize),
            currentPage: pageNumber,
            pageSize,
            data: users.rows,
        });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUsers = getUsers;
const getUsersCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalUsers = yield userModel_1.UserInstance.count();
        res.status(200).json({ totalUsers });
        return;
    }
    catch (error) {
        console.error("Error fetching user count:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUsersCount = getUsersCount;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield userModel_1.UserInstance.findOne({
            where: { id },
            include: [
                {
                    model: addressModel_1.default,
                    as: "address",
                    attributes: ["city", "state"],
                },
            ],
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate request body
        const validation = userValidator_1.default.safeParse(req.body);
        if (!validation.success) {
            const formattedErrors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message;
                return acc;
            }, {});
            res.status(400).json({ errors: formattedErrors });
            return;
        }
        const { name, email } = req.body;
        // Check if user already exists
        const existingUser = yield userModel_1.UserInstance.findOne({ where: { email } });
        if (existingUser) {
            res.status(409).json({ message: "User with this email already exists" });
            return;
        }
        // Create new user (Sequelize will auto-generate `id`)
        const newUser = yield userModel_1.UserInstance.create({
            name,
            email,
        });
        res.status(201).json({ message: "User created successfully", user: newUser });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createUser = createUser;
//# sourceMappingURL=usersController.js.map