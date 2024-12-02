import { Router } from "express";
import { get_users, login_user, post_new_user} from "../controllers/login.controller";

const login_router = Router();

login_router.get("/get_users", get_users) // solo puede realizar la búsqeuda cuando tenga una cuenta y un rol

login_router.post("/login", login_user)
login_router.post("/register", post_new_user)

export default login_router;