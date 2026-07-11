const { User, Project, Contact } = require('../models/examples');
const { sendEmail } = require('../config/email');

// User Controller
const userController = {
  create: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },
  
  getAll: async (req, res) => {
    try {
      const users = await User.find().select('-password');
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },
  
  getById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },
  
  update: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      ).select('-password');
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },
  
  delete: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
};

// Project Controller
const projectController = {
  create: async (req, res) => {
    try {
      const project = await Project.create(req.body);
      res.status(201).json({ success: true, data: project });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },
  
  getAll: async (req, res) => {
    try {
      const projects = await Project.find().sort('-createdAt');
      res.status(200).json({ success: true, data: projects });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },
  
  getById: async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ success: false, error: 'Project not found' });
      }
      res.status(200).json({ success: true, data: project });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },
  
  update: async (req, res) => {
    try {
      const project = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!project) {
        return res.status(404).json({ success: false, error: 'Project not found' });
      }
      res.status(200).json({ success: true, data: project });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },
  
  delete: async (req, res) => {
    try {
      const project = await Project.findByIdAndDelete(req.params.id);
      if (!project) {
        return res.status(404).json({ success: false, error: 'Project not found' });
      }
      res.status(200).json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
};

// Contact Controller
const contactController = {
  create: async (req, res) => {
    try {
      const contact = await Contact.create(req.body);
      
      // Send email notification
      const emailHtml = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Message:</strong></p>
        <p>${contact.message}</p>
        <p><em>Submitted on: ${new Date(contact.createdAt).toLocaleString()}</em></p>
      `;
      
      const emailText = `
        New Contact Form Submission
        Name: ${contact.name}
        Email: ${contact.email}
        Message: ${contact.message}
        Submitted on: ${new Date(contact.createdAt).toLocaleString()}
      `;
      
      await sendEmail({
        to: process.env.EMAIL_USER || 'dakshybabu@gmail.com',
        subject: `New Contact Message from ${contact.name}`,
        text: emailText,
        html: emailHtml
      });
      
      res.status(201).json({ success: true, data: contact });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },
  
  getAll: async (req, res) => {
    try {
      const contacts = await Contact.find().sort('-createdAt');
      res.status(200).json({ success: true, data: contacts });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },
  
  getById: async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) {
        return res.status(404).json({ success: false, error: 'Contact not found' });
      }
      res.status(200).json({ success: true, data: contact });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },
  
  delete: async (req, res) => {
    try {
      const contact = await Contact.findByIdAndDelete(req.params.id);
      if (!contact) {
        return res.status(404).json({ success: false, error: 'Contact not found' });
      }
      res.status(200).json({ success: true, message: 'Contact deleted successfully' });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
};

module.exports = {
  userController,
  projectController,
  contactController
};
