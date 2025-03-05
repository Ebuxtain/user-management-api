import { Request, Response } from "express";
import { UserInstance } from "../models/userModel";
import AddressInstance from "../models/addressModel";
import userValidatorSchema from "../validators/userValidator";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const pageNumber = parseInt(req.query.pageNumber as string, 10) || 0;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10;
    const offset = pageNumber * pageSize;

    const users = await UserInstance.findAndCountAll({
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
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUsersCount = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalUsers = await UserInstance.count();
    res.status(200).json({ totalUsers });
    return;
  } catch (error) {
    console.error("Error fetching user count:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; 

    const user = await UserInstance.findOne({
      where: { id }, 
      include: [
        {
          model: AddressInstance,
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
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request body
    const validation = userValidatorSchema.safeParse(req.body);

    if (!validation.success) {
      const formattedErrors = validation.error.errors.reduce((acc: any, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {});

      res.status(400).json({ errors: formattedErrors });
      return;
    }

    const { name, email } = req.body;

    // Check if user already exists
    const existingUser = await UserInstance.findOne({ where: { email } });
    if (existingUser) {
      res.status(409).json({ message: "User with this email already exists" });
      return;
    }

  
  // Create new user (Sequelize will auto-generate `id`)
    const newUser = await UserInstance.create({
      name,
      email,
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
