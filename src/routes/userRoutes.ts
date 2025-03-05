import { Router } from "express"
import { createUser, getUserById, getUsers, getUsersCount } from "../controller/usersController";

const router = Router(); 

router.get("/users", getUsers);
router.get("/users/count", getUsersCount);
router.post("/users", createUser);
router.get("/users/:id", getUserById);

export default router;
