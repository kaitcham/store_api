require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');
const notFoundError = require('./middleware/notFound');
const customErrorHandler = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1/products', productsRouter);

app.use(notFoundError);
app.use(customErrorHandler);

const checkConnectionAndStartServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

checkConnectionAndStartServer();
