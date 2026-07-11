# Backend API Setup

A flexible Express.js backend with MongoDB integration and dynamic CRUD operations.

## Features

- **Flexible CRUD API**: Generic endpoints that work with any model
- **MongoDB Integration**: Using Mongoose ODM
- **Example Models**: Pre-configured User, Project, and Contact models
- **Error Handling**: Comprehensive error middleware
- **CORS Enabled**: Ready for frontend integration
- **Environment Variables**: Secure configuration management
- **Email Notifications**: Automatic email sending for contact form submissions

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
JWT_SECRET=your_jwt_secret_here

# Email Configuration (Gmail)
EMAIL_USER=dakshybabu@gmail.com
EMAIL_PASS=your_app_password_here
```

**Important for Gmail:**
- You need to use an App Password, not your regular Gmail password
- Enable 2-factor authentication on your Google account
- Go to Google Account settings → Security → App passwords
- Create a new app password and use it as `EMAIL_PASS`

## Running the Server

**Production mode:**
```bash
npm run server
```

**Development mode (with auto-reload):**
```bash
npm run dev:server
```

## API Endpoints

### Generic CRUD Routes (Flexible)

These routes work with any model name:

- `POST /api/crud/:modelName` - Create a new document
- `GET /api/crud/:modelName` - Get all documents (with pagination)
- `GET /api/crud/:modelName/:id` - Get single document by ID
- `PUT /api/crud/:modelName/:id` - Update document by ID
- `DELETE /api/crud/:modelName/:id` - Delete document by ID

**Example usage:**
```bash
# Create a new document in a custom collection
POST /api/crud/products
{
  "name": "Product 1",
  "price": 99.99,
  "inStock": true
}

# Get all products with pagination
GET /api/crud/products?page=1&limit=10

# Get specific product
GET /api/crud/products/507f1f77bcf86cd799439011

# Update product
PUT /api/crud/products/507f1f77bcf86cd799439011
{
  "price": 89.99
}

# Delete product
DELETE /api/crud/products/507f1f77bcf86cd799439011
```

### Specific Model Routes

#### Users
- `POST /api/users` - Create user
- `GET /api/users` - Get all users (passwords excluded)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

#### Projects
- `POST /api/projects` - Create project
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

#### Contacts
- `POST /api/contacts` - Create contact message (sends email notification)
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get contact by ID
- `DELETE /api/contacts/:id` - Delete contact

### Health Check
- `GET /health` - Server health status

## Example Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Project Model
```javascript
{
  title: String (required),
  description: String,
  technologies: [String],
  imageUrl: String,
  liveUrl: String,
  githubUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Model
```javascript
{
  name: String (required),
  email: String (required),
  message: String (required),
  createdAt: Date
}
```

## Adding New Models

1. Create a new schema in `server/models/examples.js`
2. Export the model using the `createModel` function
3. Create a controller in `server/controllers/specificControllers.js`
4. Add routes in `server/routes/`

Or use the generic CRUD routes without any additional setup!

## Project Structure

```
server/
├── config/
│   ├── database.js          # MongoDB connection
│   └── email.js             # Email configuration (Nodemailer)
├── controllers/
│   ├── crudController.js    # Generic CRUD operations
│   └── specificControllers.js # Model-specific controllers
├── middleware/
│   ├── auth.js              # Authentication middleware
│   ├── errorHandler.js      # Error handling
│   └── validation.js        # Request validation
├── models/
│   ├── index.js             # Dynamic model factory
│   └── examples.js          # Example model schemas
├── routes/
│   ├── index.js             # Main router
│   ├── crudRoutes.js        # Generic CRUD routes
│   ├── userRoutes.js        # User routes
│   ├── projectRoutes.js     # Project routes
│   └── contactRoutes.js     # Contact routes
├── index.js                 # Server entry point
└── README.md                # This file
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

Common error codes:
- `400` - Bad Request (validation errors)
- `404` - Not Found (resource doesn't exist)
- `500` - Server Error

## Development Notes

- The generic CRUD controller dynamically creates schemas based on request data
- All routes include CORS headers for frontend integration
- Authentication middleware is included as a placeholder for JWT implementation
- Use nodemon for development to automatically restart on file changes
- Contact form submissions automatically send email notifications to the configured email address

## Email Setup

The backend is configured to send email notifications when contact forms are submitted. The email will be sent to the address configured in `EMAIL_USER` environment variable.

**Email Template:**
When a contact form is submitted, an email with the following content is sent:
- Subject: "New Contact Message from [Name]"
- Body: Includes name, email, message, and submission timestamp
- Both HTML and plain text versions are sent
