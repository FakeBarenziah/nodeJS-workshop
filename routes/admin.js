const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

// /admin/product-list => GET
router.get("/product-list", adminController.getAdminProductList);

// /admin/edit-product => GET
router.get("/edit-product/:productID", adminController.getEditProduct);

module.exports = router;
