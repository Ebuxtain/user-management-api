import request from "supertest";
import app from "../src/app";
import db from "../src/database/database.config";
import { UserInstance } from "../src/models/userModel";
import AddressInstance from "../src/models/addressModel";

beforeAll(async () => {
  await db.sync({ force: true }); 
});

beforeEach(async () => {
  await db.truncate({ cascade: true, restartIdentity: true }); 
});




test("GET /users/ should return paginated users", async () => {
  await UserInstance.bulkCreate([
    { name: "EbukaOnwumelu", email: "ebxtain@example.com" },
    { name: "FrankOkeke", email: "FrankOkeke@example.com" },
  ]);

  const res = await request(app).get("/users/");
  
 

  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("data"); 
  expect(Array.isArray(res.body.data)).toBe(true); 
  expect(res.body.data.length).toBeGreaterThan(1); 

  expect(res.body).toMatchObject({
    message: "Users retrieved successfully",
    totalUsers: expect.any(Number),
    data: expect.any(Array), 
    totalPages: expect.any(Number),
    currentPage: expect.any(Number),
    pageSize: expect.any(Number),
  });
});

  
  test(" GET /users/count - should return total user count", async () => {
    await UserInstance.create({ name: "Test User", email: "test@example.com" });

    const res = await request(app).get("/users/count");

    expect(res.status).toBe(200);
    expect(res.body.totalUsers).toBe(1)
    expect(res.body.totalUsers).toBe(1);
  });

  test("GET /users/:id - should return user details with address", async () => {
    const user = await UserInstance.create({
      name: "John Doe",
      email: "johndoe@example.com",
    });

    await AddressInstance.create({
      userId: user.id,
      city: "Lagos",
      state: "Nigeria",
    });

    const res = await request(app).get(`/users/${user.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.name).toBe("John Doe");
    expect(res.body.user.email).toBe("johndoe@example.com");
    expect(res.body.user).toHaveProperty("address");
    expect(res.body.user.address.city).toBe("Lagos");
    expect(res.body.user.address.state).toBe("Nigeria");
  });

  test(" GET /users/:id - should return 404 if user not found", async () => {
    const res = await request(app).get("/users/999");

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "User not found");
  });

  test(" POST /users - should create a user successfully", async () => {
    const userData = { name: "New User", email: "newuser@example.com" };

    const res = await request(app).post("/users").send(userData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "User created successfully");
    expect(res.body.user).toHaveProperty("name", userData.name);
    expect(res.body.user).toHaveProperty("email", userData.email);
  });

  test(" POST /users - should return 400 for invalid request body", async () => {
    const res = await request(app).post("/users").send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveProperty("name");
    expect(res.body.errors).toHaveProperty("email");
  });

  test(" POST /users - should return 409 if email already exists", async () => {
    await UserInstance.create({ name: "John Doe", email: "johndoe@example.com" });

    const res = await request(app).post("/users").send({
      name: "John Doe",
      email: "johndoe@example.com",
    });

    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty("message", "User with this email already exists");
  });

