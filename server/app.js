import express from "express";
import GlobalErrorHandler from "./middlewares/error.js";
import UserRoute from "./routes/UserRoute.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v1", UserRoute);

app.use(GlobalErrorHandler);
export default app;
