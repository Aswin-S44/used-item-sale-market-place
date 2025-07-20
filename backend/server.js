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

// Configure CORS
var corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_PROD_URL
      : "http://localhost:3000",
  credentials: true, // Required for cookies
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-strong-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

// Custom middleware to make user available in routes
app.use((req, res, next) => {
  // You can access session data via req.session
  // For example, if you store user ID in session during login:
  // req.user = { id: req.session.userId };
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
