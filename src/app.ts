import express from "express";
import login_router from "./routes/login.routes";

const app = express();

app.use(express.json())
app.use(login_router)

export default app


