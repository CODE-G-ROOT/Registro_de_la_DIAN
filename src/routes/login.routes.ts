import { Router } from "express";
import { get_users, post_new_user } from "../controllers/login.controller";

const login_router = Router();

login_router.get("/login", get_users)

login_router.post("/login", post_new_user)
login_router.post("/register")

export default login_router;