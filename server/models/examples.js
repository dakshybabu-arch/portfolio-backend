const mongoose = require('mongoose');
const { createModel } = require('./index');

// Example: User model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Example: Project model
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  technologies: [{ type: String }],
  imageUrl: { type: String },
  liveUrl: { type: String },
  githubUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Example: Contact model
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create and export models
const User = createModel('User', userSchema);
const Project = createModel('Project', projectSchema);
const Contact = createModel('Contact', contactSchema);

module.exports = {
  User,
  Project,
  Contact
};
