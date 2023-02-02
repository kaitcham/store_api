require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const checkConnectionAndStartServer = () => {
  try {
    app.listen(port, console.log(`Server is running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

checkConnectionAndStartServer();
