const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getRoot = (req, res, next) => {
  res.render("shop/index", {
    pageTitle: "Shop Home",
    path: "/",
    activeShop: true,
    productCSS: true,
  });
};

/* ====================
      PRODUCTS
=====================*/

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Shop",
      path: "/products",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

exports.getSingleProduct = (req, res, next) => {
  const prodID = req.params.prodID;
  Product.findById(prodID, (product) => {
    res.render("shop/product-detail", {
      pageTitle: product.title,
      path: "/products",
      activeShop: true,
      productCSS: true,
      product: product,
    });
  });
};

/* ====================
        CART 
=====================*/

exports.getCart = (req, res, next) => {
  const cart = Cart.fetchCart((cart) => {
    res.render("shop/cart", {
      pageTitle: "Cart",
      path: "/cart",
      activeShop: true,
      productCSS: true,
      cart: cart,
    });
  });
};

exports.postCart = (req, res, next) => {
  const { productID } = req.body;
  const productPrice = Product.findById(productID, (product) => {
    Cart.addProduct(productID, product.price);
  });
  res.redirect("/cart");
};

/*==================
        ORDERS
==================*/

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
    activeShop: true,
    productCSS: true,
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
    activeShop: true,
    productCSS: true,
  });
};
