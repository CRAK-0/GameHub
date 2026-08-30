import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import reviewRouter from "./routes/review.routes.js";
import gameRoutes from "./routes/game.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/games", gameRoutes);

export default app;
