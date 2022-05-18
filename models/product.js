const fs = require("fs");
const path = require("path");

const directory = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(directory, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    const setOfIds = new Set();
    let newId = Math.floor(Math.random() * 100000).toString();
    getProductsFromFile((products) => {
      products.forEach((each) => setOfIds.add(each.id));
      while (setOfIds.has(newId)) {
        newId = Math.floor(Math.random() * 100000).toString();
      }
      this.id = newId;

      products.push(this);
      fs.writeFile(directory, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const found = products.find((each) => each.id === id);
      cb(found);
    });
  }
};
