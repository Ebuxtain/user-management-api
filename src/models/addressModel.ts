import { DataTypes, Model } from "sequelize";
import db from "../database/database.config";
import UserInstance from "./userModel";

export interface AddressAttributes {
  id?: number;
  userId: number;
  city: string;
  state: string;
}

export class AddressInstance extends Model<AddressAttributes> {
  city: any;
  state: any;
}

AddressInstance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserInstance,
        key: "id",
      },
   
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "addresses",
    timestamps: true,
  }
);

UserInstance.hasOne(AddressInstance, {
  foreignKey: "userId",
  as: "address",
});

AddressInstance.belongsTo(UserInstance, {
  foreignKey: "userId",
  as: "user",
});

export default AddressInstance;
