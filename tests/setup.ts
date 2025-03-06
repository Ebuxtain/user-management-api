import { sequelize } from "./database/database"; 

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

beforeEach(async () => {
  await sequelize.truncate({ cascade: true, restartIdentity: true });
});

afterAll(async () => {
  try {
    console.log("Closing database connection...");
    await sequelize.close(); 
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Error closing database:", error);
  }
});
