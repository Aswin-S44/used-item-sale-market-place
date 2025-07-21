const express = require("express");
const { getAllProducts } = require("../../controllers/users/getAllProducts");

const router = express.Router();

router.get("/products", getAllProducts);

module.exports = router;
