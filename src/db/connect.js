const mangoose = require('mongoose');
mangoose.set('strictQuery', true);

const connectDB = (url) => mangoose.connect(url);

module.exports = connectDB;
