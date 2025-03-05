import {Request, Response } from "express";
import AddressInstance from "../models/addressModel";
import UserInstance from "../models/userModel";





export const getUserAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params; 

    // Validate userId
    if (!userId || isNaN(Number(userId))) {
      res.status(400).json({ message: "Valid User ID is required" });
      return;
    }

    // Check if the user exists
    const user = await UserInstance.findByPk(Number(userId));
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Fetch the user's address directly
    const address = await AddressInstance.findOne({
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
  } catch (error) {
    console.error("Error fetching user address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const createAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, city, state } = req.body;

    // Ensure userId is a number 
    const parsedUserId = Number(userId);
    if (isNaN(parsedUserId)) {
      res.status(400).json({ message: "Invalid user ID format" });
      return;
    }

    // Check if user exists
    const user = await UserInstance.findByPk(parsedUserId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Check if address already exists for this user
    const existingAddress = await AddressInstance.findOne({ where: { userId: parsedUserId } });
    if (existingAddress) {
      res.status(400).json({ message: "User already has an address" });
      return;
    }

    // Create new address
    const newAddress = await AddressInstance.create({ userId: parsedUserId, city, state });

    res.status(201).json({ message: "Address created successfully", address: newAddress });

  } catch (error: any) {
    console.error("Error creating address:", error);

    // Handle Sequelize validation/database errors
    if (error.name === "SequelizeValidationError") {
      res.status(400).json({ message: error.errors.map((err: any) => err.message) });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};


export const updateAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params; 
    const { city, state } = req.body;

    // Validate userId
    if (!userId || isNaN(Number(userId))) {
      res.status(400).json({ message: "Valid User ID is required" });
      return;
    }

    // Check if user exists
    const user = await UserInstance.findByPk(Number(userId));
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Find the address associated with the userId
    const address = await AddressInstance.findOne({ where: { userId: Number(userId) } });
    if (!address) {
      res.status(404).json({ message: "Address not found for this user" });
      return;
    }

    // Update address fields (if provided)
    await address.update({
      city: city ?? address.city,
      state: state ?? address.state,
    });

    res.status(200).json({
      message: "Address updated successfully",
      data: address,
    });

  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
