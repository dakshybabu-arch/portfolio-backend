const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// Security middleware configuration
const securityMiddleware = (app) => {
  // Helmet: Sets various HTTP headers for security
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    crossOriginEmbedderPolicy: false,
  }));

  // Data sanitization against NoSQL injection attacks
  app.use(mongoSanitize());

  // Data sanitization against XSS attacks
  app.use(xss());

  // Prevent parameter pollution
  app.use(hpp({
    whitelist: ['fields', 'sort', 'page', 'limit'],
  }));
};

module.exports = securityMiddleware;
