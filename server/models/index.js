const mongoose = require('mongoose');

// Dynamic model factory for flexible CRUD operations
const createModel = (modelName, schema) => {
  if (mongoose.models[modelName]) {
    return mongoose.model(modelName);
  }
  return mongoose.model(modelName, schema);
};

module.exports = { createModel };
