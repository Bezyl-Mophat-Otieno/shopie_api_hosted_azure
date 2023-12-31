import { Router } from "express";
import addUser from "../controllers/user.contollers/addUser.js";
import fetchUsers from "../controllers/user.contollers/fetchUsers.js";
import deleteUser from "../controllers/user.contollers/deleteUser.js";
import updateUser from "../controllers/user.contollers/updateUser.js";
import loginUser from "../controllers/user.contollers/loginUser.js";
import getLoggedUser from "../controllers/user.contollers/getLoggedUser.js";
import resetPassword from "../controllers/user.contollers/resetPassword.js";
import activateUser from "../controllers/user.contollers/activateUser.js";
import getUser from "../controllers/user.contollers/getUser.js";
const userRoutes = Router();
userRoutes.post("/add", addUser);
userRoutes.get("/", fetchUsers);
userRoutes.put("/delete/:id", deleteUser);
userRoutes.put("/activate/:id", activateUser);
userRoutes.put("/:id", updateUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/user", getLoggedUser);
userRoutes.get("/one/:id", getUser);
userRoutes.post("/reset", resetPassword);
export default userRoutes;
