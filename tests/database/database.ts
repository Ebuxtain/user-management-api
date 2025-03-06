import { Sequelize, Dialect } from "sequelize";

const env = process.env.NODE_ENV || "development";

const configs: Record<string, { dialect: Dialect; storage?: string; logging?: boolean; database?: string; username?: string; password?: string; host?: string }> = {
  development: {
    dialect: "sqlite",
    storage: "./dev.sqlite",
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:",
    logging: false, 
  },
  production: {
    dialect: "postgres", 
    database: process.env.DB_NAME as string,
    username: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
    host: process.env.DB_HOST as string,
  },
};

const config = configs[env];

export const sequelize = new Sequelize(config);

