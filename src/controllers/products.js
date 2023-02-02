const Product = require('../models/product');

const getAllProducts = async (req, res) => {
  let queryObject = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields', 'numericFilters'];
  excludedFields.forEach((el) => delete queryObject[el]);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit > 100 ? 100 : req.query.limit) || 10;
  const skip = (page - 1) * limit;

  let result = Product.find(queryObject).skip(skip).limit(limit);

  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    result = result.select(fields);
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    result = result.sort(sortBy);
  } else {
    result = result.sort('-createdAt');
  }

  if (req.query.numericFilters) {
    const options = ['price', 'rating'];
    const FilterObject = req.query.numericFilters;

    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };

    FilterObject.split(',').forEach((item) => {
      const [field, operator, value] = item.split(/\b(>|>=|=|<|<=)\b/g);
      if (options.includes(field)) {
        result = result.find({
          [field]: { [operatorMap[operator]]: Number(value) },
        });
      }
    });
  }

  const products = await result;
  res.json({ products, nbHits: products.length });
};

module.exports = { getAllProducts };
