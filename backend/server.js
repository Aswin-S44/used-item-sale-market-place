const express = require("express");
const userRouter = require("./src/routes/users/routes");
const dealerRouter = require("./src/routes/dealers/routes");
const adminRouter = require("./src/routes/admin/routes");
const cors = require("cors");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

const db = require("./config/db");
db.connect();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes configuration
app.use("/api/v1/user", userRouter);
app.use("/api/v1/dealer", dealerRouter);
app.use("/api/v1/admin", adminRouter);

app.get("/", (req, res) => {
  res.send({ message: "Nodejs server is running " });
});

app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});
