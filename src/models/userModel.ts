import { DataTypes, Model } from "sequelize";
import db from "../database/database.config";

export interface UserAttributes {
    id?: number;  
    name: string;
    email: string;
}

export class UserInstance extends Model<UserAttributes> {
  address: any;
  id!: number;
}

UserInstance.init(
    {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true,  
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
    },
    {
        sequelize: db,
        tableName: "user",
        timestamps: true,
    }
);

export default UserInstance;
