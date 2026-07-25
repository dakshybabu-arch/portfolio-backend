# Security Features

This document outlines the security features implemented in the portfolio backend API.

## Environment Variables

Add the following environment variables to your `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_minimum_32_characters
JWT_EXPIRE=7d
PORT=5000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

**Important:** 
- `JWT_SECRET` must be at least 32 characters long
- `ALLOWED_ORIGINS` should be a comma-separated list of allowed frontend URLs

## Security Middleware

### 1. Helmet (HTTP Security Headers)
- Sets security-related HTTP headers
- Content Security Policy (CSP) to prevent XSS attacks
- HSTS, X-Frame-Options, X-Content-Type-Options, etc.

### 2. Rate Limiting
- **General API**: 100 requests per 15 minutes per IP
- **Authentication endpoints**: 5 requests per 15 minutes per IP
- **Contact form**: 3 submissions per hour per IP

### 3. Input Sanitization
- **MongoDB Sanitization**: Prevents NoSQL injection attacks
- **XSS Protection**: Sanitizes user input against XSS attacks
- **Parameter Pollution**: Prevents HTTP parameter pollution

### 4. CORS Configuration
- Restricts cross-origin requests to specific allowed origins
- Credentials support for authenticated requests
- Specific allowed methods and headers

### 5. Request Size Limits
- JSON body limit: 10kb
- URL-encoded body limit: 10kb

### 6. Request Logging
- Logs all incoming requests with timestamp, method, URL, IP, and User-Agent
- Helps with security monitoring and debugging

### 7. Environment Validation
- Validates required environment variables on startup
- Ensures JWT_SECRET meets minimum security requirements

## JWT Authentication

### Usage
Use the `auth` middleware for protected routes:

```javascript
const { auth } = require('../middleware/auth');

router.post('/protected', auth, (req, res) => {
  // req.user contains the decoded JWT payload
  res.json({ message: 'Protected data', user: req.user });
});
```

### Optional Authentication
Use `optionalAuth` for routes that work with or without authentication:

```javascript
const { optionalAuth } = require('../middleware/auth');

router.get('/public-data', optionalAuth, (req, res) => {
  if (req.user) {
    // Authenticated user
  } else {
    // Anonymous user
  }
});
```

### Generating Tokens
```javascript
const { generateToken } = require('../utils/jwt');

const token = generateToken({ userId: user._id, email: user.email });
```

## Security Best Practices

1. **Never commit `.env` file** - It contains sensitive credentials
2. **Use strong JWT secrets** - At least 32 characters, preferably random
3. **Rotate secrets regularly** - Change JWT_SECRET periodically
4. **Monitor logs** - Check request logs for suspicious activity
5. **Keep dependencies updated** - Run `npm audit` regularly
6. **Use HTTPS in production** - Always use SSL/TLS in production
7. **Limit CORS origins** - Only allow trusted domains
8. **Implement proper error handling** - Don't expose sensitive information in errors

## Rate Limiting by Route

Contact form submissions have stricter rate limiting to prevent spam:

```javascript
const { contactLimiter } = require('../middleware/rateLimiter');
router.post('/', contactLimiter, contactController.create);
```

Apply `authLimiter` to authentication routes for additional protection:

```javascript
const { authLimiter } = require('../middleware/rateLimiter');
router.post('/login', authLimiter, authController.login);
```

## Monitoring

The request logger outputs:
- Timestamp
- HTTP method
- Request URL
- Client IP address
- User-Agent string

Monitor these logs for:
- Unusual request patterns
- High frequency requests from single IPs
- Requests from unknown user agents
- Failed authentication attempts

## Additional Recommendations

1. **Implement account lockout** after failed login attempts
2. **Add email verification** for user registration
3. **Implement password strength requirements**
4. **Add two-factor authentication (2FA)** for sensitive operations
5. **Set up security headers** in Next.js frontend as well
6. **Implement CSRF protection** for state-changing operations
7. **Add API key authentication** for third-party integrations
8. **Set up automated security scanning** in CI/CD pipeline
