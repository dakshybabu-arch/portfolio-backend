const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const securityMiddleware = require('./middleware/security');
const { generalLimiter, authLimiter, contactLimiter } = require('./middleware/rateLimiter');
const logger = require('./middleware/logger');
const validateEnv = require('./middleware/envValidator');

// Load environment variables
dotenv.config();

// Validate required environment variables
validateEnv();

// Initialize Express app
const app = express();

// Connect to database
connectDB();

// Security middleware
securityMiddleware(app);

// CORS configuration with specific origins
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request logging
app.use(logger);

// Rate limiting
app.use('/api', generalLimiter);

// Body parser with size limits
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// API Routes
app.use('/api', routes);

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Portfolio API Server',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api',
      users: '/api/users',
      projects: '/api/projects',
      contacts: '/api/contacts',
      crud: '/api/crud/:modelName'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
