import request from "supertest";
import app from "../src/app";
import sequelize from "../src/database/database.config"; 
import { UserInstance } from "../src/models/userModel"; 

describe("Post Management API Tests", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); 
  });

  

  describe("Post Management API", () => {
    let user: UserInstance;
    let postId: number;

    beforeAll(async () => {
      // Create a test user
      user = await UserInstance.create({ name: "Test User", email: "test@example.com" });
    });

    test("POST /posts/create - should create a post", async () => {
      const res = await request(app)
        .post("/posts/create")
        .send({ title: "My First Post", body: "Hello world!", userId: user.id });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("message", "Post created successfully");
      expect(res.body.data).toHaveProperty("id");

      postId = res.body.data.id; 
    });

    test("POST /posts/create - should return 400 for missing fields", async () => {
      const res = await request(app).post("/posts/create").send({ userId: user.id });

      expect(res.status).toBe(400);
      expect(res.body.errors).toHaveProperty("title");
      expect(res.body.errors).toHaveProperty("body");
    });

    test("GET /posts/get-post/:userId - should return 404 for non-existent user", async () => {
      const res = await request(app).get("/posts/get-post/9"); 
    
     
    
      expect(res.status).toBe(404);
   
      expect(res.body).toEqual
      ({ message: "User not found" });
 
    });
    


    test("DELETE /posts/delete/:id - should delete a post", async () => {
      const res = await request(app).delete(`/posts/delete/${postId}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Post deleted successfully");
    });

    test("DELETE /posts/delete/:id - should return 404 for non-existent post", async () => {
      const res = await request(app).delete("/posts/delete/99");
    
    
    
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("message", "Post not found");
    });
    
  });
});

