import { Router } from "express"
import { createUser, getPaginatedUsers, getUserById, getUsersCount } from "../controller/usersController";

const router = Router(); 

router.post("/", createUser);          
router.get("/", getPaginatedUsers);             
router.get("/count", getUsersCount);    
router.get("/:id", getUserById);

export default router;
