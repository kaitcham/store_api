require('dotenv').config();
const connectDB = require('./connect');
const products = require('./products.json');
const Product = require('../models/product');

const populateDB = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Data populated successfully!');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

populateDB();
