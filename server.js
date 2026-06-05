import "dotenv/config";
import express from "express";
import userRouter from "./routes/user.routes.js";
import urlRouter from "./routes/url.routes.js";
import { authenticationMiddleware } from "./middleware/auth.middleware.js";
const app = express();

const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use(authenticationMiddleware);

app.get("/", (req, res) => {
  return res.json({ Status: `Server up and running......` });
});

app.use("/user", userRouter);
app.use(urlRouter);

app.listen(PORT, () => {
  console.log(`Server up and running on Port ${PORT}`);
});
