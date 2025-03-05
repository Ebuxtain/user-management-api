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
exports.updateAddress = exports.createAddress = exports.getUserAddress = void 0;
const addressModel_1 = __importDefault(require("../models/addressModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const getUserAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // Validate userId
        if (!userId || isNaN(Number(userId))) {
            res.status(400).json({ message: "Valid User ID is required" });
            return;
        }
        // Check if the user exists
        const user = yield userModel_1.default.findByPk(Number(userId));
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Fetch the user's address directly
        const address = yield addressModel_1.default.findOne({
            where: { userId: Number(userId) },
            attributes: ["city", "state"],
        });
        // If no address is found
        if (!address) {
            res.status(404).json({ message: "No address found for this user" });
            return;
        }
        // Return the address
        res.status(200).json({
            message: "User address retrieved successfully",
            data: address,
        });
    }
    catch (error) {
        console.error("Error fetching user address:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUserAddress = getUserAddress;
const createAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, city, state } = req.body;
        // Ensure userId is a number 
        const parsedUserId = Number(userId);
        if (isNaN(parsedUserId)) {
            res.status(400).json({ message: "Invalid user ID format" });
            return;
        }
        // Check if user exists
        const user = yield userModel_1.default.findByPk(parsedUserId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Check if address already exists for this user
        const existingAddress = yield addressModel_1.default.findOne({ where: { userId: parsedUserId } });
        if (existingAddress) {
            res.status(400).json({ message: "User already has an address" });
            return;
        }
        // Create new address
        const newAddress = yield addressModel_1.default.create({ userId: parsedUserId, city, state });
        res.status(201).json({ message: "Address created successfully", address: newAddress });
    }
    catch (error) {
        console.error("Error creating address:", error);
        // Handle Sequelize validation/database errors
        if (error.name === "SequelizeValidationError") {
            res.status(400).json({ message: error.errors.map((err) => err.message) });
        }
        else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
});
exports.createAddress = createAddress;
const updateAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { city, state } = req.body;
        // Validate userId
        if (!userId || isNaN(Number(userId))) {
            res.status(400).json({ message: "Valid User ID is required" });
            return;
        }
        // Check if user exists
        const user = yield userModel_1.default.findByPk(Number(userId));
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Find the address associated with the userId
        const address = yield addressModel_1.default.findOne({ where: { userId: Number(userId) } });
        if (!address) {
            res.status(404).json({ message: "Address not found for this user" });
            return;
        }
        // Update address fields (if provided)
        yield address.update({
            city: city !== null && city !== void 0 ? city : address.city,
            state: state !== null && state !== void 0 ? state : address.state,
        });
        res.status(200).json({
            message: "Address updated successfully",
            data: address,
        });
    }
    catch (error) {
        console.error("Error updating address:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateAddress = updateAddress;
//# sourceMappingURL=addressController.js.map