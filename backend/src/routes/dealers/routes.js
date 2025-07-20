const express = require("express");
const { Signup, SignIn } = require("../../controllers/AuthController");
const { addProduct } = require("../../controllers/addProduct");
const { userVerification } = require("../../../middlewares/authMiddleware");
const { getDealerById } = require("../../controllers/getDealerById");
const { getMe } = require("../../controllers/getMe");
const {
  getProductsByDealerId,
} = require("../../controllers/getProductsByDealerId");
const { deleteProductById } = require("../../controllers/deleteProductById");
const { getProductById } = require("../../controllers/getProductById");
const { updateProductById } = require("../../controllers/updateProductById");

const router = express.Router();
router.get("/me", userVerification, getMe);
router.post("/signup", Signup);
router.post("/signin", SignIn);

router.post("/product", userVerification, addProduct);
router.get("/profile/:id", getDealerById);
router.get("/products/:dealerId", getProductsByDealerId);
router.delete("/product/:productId", deleteProductById);
router.get("/product/:productId", getProductById);
router.patch("/product/:productId", updateProductById);

module.exports = router;
