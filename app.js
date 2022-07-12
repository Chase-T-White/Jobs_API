require("dotenv").config();
require("express-async-errors");

// Extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// Connect routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
// Connect Database
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

const express = require("express");
const app = express();

const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const { connect } = require("mongoose");

// Middlewares
app.set("trust proxy", 1);

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(errorHandlerMiddleware);
app.use(notFound);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (err) {
    console.log(err);
  }
};

start();
