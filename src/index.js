require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1/products', productsRouter);

const checkConnectionAndStartServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

checkConnectionAndStartServer();
