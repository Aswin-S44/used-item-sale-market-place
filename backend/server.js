const express = require("express");
const session = require("express-session");
const userRouter = require("./src/routes/users/routes");
const dealerRouter = require("./src/routes/dealers/routes");
const adminRouter = require("./src/routes/admin/routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

const db = require("./config/db");
db.connect();

var corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_PROD_URL
      : "http://localhost:3000",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};

app.use(
  session({
    secret: process.env.SESSION_SECRET || "session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use((req, res, next) => {
  next();
});

// Routes configuration
app.use("/api/v1/user", userRouter);
app.use("/api/v1/dealer", dealerRouter);
app.use("/api/v1/admin", adminRouter);

app.get("/", (req, res) => {
  res.send({ message: "Nodejs server is running " });
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
