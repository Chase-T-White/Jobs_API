require("dotenv").config();
require("express-async-errors");
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
app.use(express.json());

// Extra Packages

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
