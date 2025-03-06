import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  storage: "./database.sqlite",
  dialect: "sqlite",
  logging: false,
  define: {
    timestamps: true,
  },
});

export default sequelize;


  