const Product = require('../models/product');

const getAllProducts = async (req, res) => {
  let queryObject = { ...req.query };
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit > 100 ? 100 : req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const products = await Product.find(queryObject).skip(skip).limit(limit);
  res.json({ products, nbHits: products.length });
};

module.exports = { getAllProducts };
