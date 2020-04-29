const Product = require("../models/product");

exports.getAdminProductList = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/product-list", {
      prods: products,
      pageTitle: "Shop",
      path: "/admin/product-list",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};
