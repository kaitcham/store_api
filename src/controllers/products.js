const Product = require('../models/product');

const getAllProducts = async (req, res) => {
  let queryObject = { ...req.query };
  const products = await Product.find(queryObject);
  res.json({ products, nbHits: products.length });
};

module.exports = { getAllProducts };
