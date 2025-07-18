const express = require("express");
const { Signup, SignIn } = require("../../controllers/AuthController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Dealer router called");
});

router.post("/signup", Signup);
router.post("/signin", SignIn);

module.exports = router;
