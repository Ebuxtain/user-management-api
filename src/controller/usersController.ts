import { Request, Response } from "express";
import { UserInstance } from "../models/userModel";
import AddressInstance from "../models/addressModel";
import userValidatorSchema from "../validators/userValidator";

export const getPaginatedUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const { count, rows } = await UserInstance.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

     res.status(200).json({
      message: "Users retrieved successfully",
      totalUsers: count,
      data: rows, 
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
      pageSize,
    });
    return
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
