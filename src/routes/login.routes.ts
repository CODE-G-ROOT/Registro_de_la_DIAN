import { Router } from "express";
import { get_users } from "../controllers/login.controller";

const login_router = Router();

login_router.get("/login", get_users)
login_router.get("/register")

login_router.post("/login")
login_router.post("/register")

export default login_router;