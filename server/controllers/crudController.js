const { createModel } = require('../models');

// Generic CRUD Controller for flexible API operations
class CRUDController {
  // Create a new document
  static async create(req, res) {
    try {
      const { modelName } = req.params;
      const schema = this.buildSchemaFromRequest(req.body);
      const Model = createModel(modelName, schema);
      
      const document = await Model.create(req.body);
      res.status(201).json({
        success: true,
        data: document
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  // Get all documents with pagination and filtering
  static async getAll(req, res) {
    try {
      const { modelName } = req.params;
      const { page = 1, limit = 10, sort = '-createdAt', ...filters } = req.query;
      
      const schema = new mongoose.Schema({});
      const Model = createModel(modelName, schema);
      
      const documents = await Model
        .find(filters)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      const total = await Model.countDocuments(filters);

      res.status(200).json({
        success: true,
        data: documents,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  // Get single document by ID
  static async getById(req, res) {
    try {
      const { modelName, id } = req.params;
      const schema = new mongoose.Schema({});
      const Model = createModel(modelName, schema);
      
      const document = await Model.findById(id);
      
      if (!document) {
        return res.status(404).json({
          success: false,
          error: 'Document not found'
        });
      }

      res.status(200).json({
        success: true,
        data: document
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  // Update document by ID
  static async update(req, res) {
    try {
      const { modelName, id } = req.params;
      const schema = new mongoose.Schema({});
      const Model = createModel(modelName, schema);
      
      const document = await Model.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!document) {
        return res.status(404).json({
          success: false,
          error: 'Document not found'
        });
      }

      res.status(200).json({
        success: true,
        data: document
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  // Delete document by ID
  static async delete(req, res) {
    try {
      const { modelName, id } = req.params;
      const schema = new mongoose.Schema({});
      const Model = createModel(modelName, schema);
      
      const document = await Model.findByIdAndDelete(id);

      if (!document) {
        return res.status(404).json({
          success: false,
          error: 'Document not found'
        });
      }

      res.status(200).json({
        success: true,
        data: {},
        message: 'Document deleted successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  // Helper method to build schema from request data
  static buildSchemaFromRequest(data) {
    const schemaDefinition = {};
    
    for (const key in data) {
      const value = data[key];
      if (typeof value === 'string') {
        schemaDefinition[key] = String;
      } else if (typeof value === 'number') {
        schemaDefinition[key] = Number;
      } else if (typeof value === 'boolean') {
        schemaDefinition[key] = Boolean;
      } else if (Array.isArray(value)) {
        schemaDefinition[key] = Array;
      } else if (typeof value === 'object') {
        schemaDefinition[key] = mongoose.Schema.Types.Mixed;
      }
    }

    return new mongoose.Schema(schemaDefinition);
  }
}

module.exports = CRUDController;
