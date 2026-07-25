# Environment Variables Setup Guide

## Vercel Environment Variables

Your application is deployed at: https://protfolio-plum-seven.vercel.app

### To add environment variables in Vercel:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following variables:

```
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/portfolio
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-16-character-gmail-app-password
# Optional display address, for example: Portfolio <your-gmail-address@gmail.com>
EMAIL_FROM=your-gmail-address@gmail.com
```

### Important Notes:

1. **MONGODB_URI**: Your MongoDB Atlas connection string
2. **EMAIL_USER** and **EMAIL_PASS** send new contact-form messages to `dakshybabu@gmail.com`.
   Use a Gmail [App Password](https://support.google.com/accounts/answer/185833), not your normal Google password.
3. **EMAIL_FROM** is optional and controls the sender address shown in the email.

### Security Best Practices:

- Never commit actual secrets to git
- Use strong, unique secrets for production
- Rotate secrets periodically
- Use different secrets for development and production

### Local Development:

Create a `.env` file in your project root (this file is already in .gitignore):

```env
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/portfolio
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-16-character-gmail-app-password
EMAIL_FROM=your-gmail-address@gmail.com
```

### API Endpoints Available:

- `GET/POST /api/contacts` - Contact form submissions
- `GET/POST /api/projects` - Projects management
- `GET/PUT/DELETE /api/projects/[id]` - Individual project operations
- `GET/POST /api/users` - User management
- `GET/POST/PUT/DELETE /api/crud/[modelName]` - Generic CRUD operations
- `GET/PUT/DELETE /api/crud/[modelName]/[id]` - Individual document operations
