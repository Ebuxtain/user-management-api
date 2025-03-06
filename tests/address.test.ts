import request from "supertest";
import app from "../src/app";
import sequelize from "../src/database/database.config";
import UserInstance from "../src/models/userModel";
import AddressInstance from "../src/models/addressModel";

beforeAll(async () => {
  await sequelize.sync({ force: true }); 
});

beforeEach(async () => {
  await sequelize.truncate({ cascade: true, restartIdentity: true });
});



describe("Address Management API Tests", () => {
  test("GET /addresses/get-address/:userId - should return 404 if user does not exist", async () => {
    const res = await request(app).get('/addresses/get-address/99');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("User not found");
  });

  test("POST /addresses/create - should create an address for a user", async () => {
    const user = await UserInstance.create({ name: "Test User", email: "test@example.com" });

    const res = await request(app)
      .post("/addresses/create")
      .send({ userId: user.id, city: "Lagos", state: "Nigeria" });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Address created successfully");
    expect(res.body.address.city).toBe("Lagos");
    expect(res.body.address.state).toBe("Nigeria");
  });

  test("POST /addresses/create - should return 400 if user already has an address", async () => {
    const user = await UserInstance.create({ name: "Test User", email: "test@example.com" });
    await AddressInstance.create({ userId: user.id, city: "Lagos", state: "Nigeria" });

    const res = await request(app)
      .post("/addresses/create")
      .send({ userId: user.id, city: "Abuja", state: "FCT" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("User already has an address");
  });

  test("PATCH /addresses/update/:userId - should update an existing address", async () => {
    const user = await UserInstance.create({ name: "Test User", email: "test@example.com" });
    await AddressInstance.create({ userId: user.id, city: "Lagos", state: "Nigeria" });

    const res = await request(app)
      .patch(`/addresses/update/${user.id}`)
      .send({ city: "Abuja", state: "FCT" });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Address updated successfully");
    expect(res.body.data.city).toBe("Abuja");
    expect(res.body.data.state).toBe("FCT");
  });

  test("PATCH /addresses/update/:userId - should return 404 if address does not exist", async () => {
    const user = await UserInstance.create({ name: "Test User", email: "test@example.com" });
  
    const res = await request(app)
      .patch(`/addresses/update/${user.id}`) 
      .send({ city: "Abuja", state: "FCT" });
  
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Address not found for this user");
  });
  
  });
  

