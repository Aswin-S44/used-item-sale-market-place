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
const {
  updateProductStatus,
} = require("../../controllers/updateProductStatus");
const { updateProfile } = require("../../controllers/updateProfile");
const {
  verifyCurrentPassword,
} = require("../../controllers/verifyCurrentPassword");
const {
  verifyAndChangePassword,
} = require("../../controllers/verifyAndChangePassword");

const router = express.Router();
router.get("/me", userVerification, getMe);
router.post("/signup", Signup);
router.post("/signin", SignIn);
router.patch("/", userVerification, updateProfile);

router.post("/product", userVerification, addProduct);
router.get("/profile/:id", getDealerById);
router.get("/products/:dealerId", getProductsByDealerId);
router.delete("/product/:productId", deleteProductById);
router.get("/product/:productId", getProductById);
router.patch("/product/:productId", updateProductById);
router.patch("/product/:productId/status", updateProductStatus);
router.post("/password/check", userVerification, verifyCurrentPassword);
router.post(
  "/password/verify-and-reset",
  userVerification,
  verifyAndChangePassword
);

module.exports = router;
