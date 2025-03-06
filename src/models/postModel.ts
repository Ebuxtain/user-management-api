import { DataTypes, Model } from "sequelize";
import db from "../database/database.config";
import UserInstance from "./userModel";

export interface PostAttributes {
  id?: number;
  title: string;
  body: string;
  userId: number;
}

export class PostInstance extends Model<PostAttributes> {
  id: any;
}

PostInstance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
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
  },
  {
    sequelize: db,
    tableName: "posts",
    timestamps: true,
  }
);

UserInstance.hasMany(PostInstance, {
  foreignKey: "userId",
  as: "posts",
});

PostInstance.belongsTo(UserInstance, {
  foreignKey: "userId",
  as: "user",
});

export default PostInstance;
