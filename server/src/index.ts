import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";
import connectDb from "./models";
import { authMiddleware } from "./middleware/authMiddleware";

dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);
app.use(express.json());
app.use("/auth", authRouter);
app.use("/dashboard", authMiddleware, userRouter);

(async function bootstrap() {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
