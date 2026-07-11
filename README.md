# Portfolio Project

A full-stack portfolio application with Next.js frontend and Express.js backend API.

## Project Structure

- **Frontend**: Next.js 16 with React 19
- **Backend**: Express.js with MongoDB Atlas
- **Features**: CRUD operations, email notifications, flexible API

## Getting Started

### Frontend (Next.js)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the frontend.

### Backend (Express.js)
```bash
npm run server
```
The backend API runs on [http://localhost:5000](http://localhost:5000).

## Backend API Documentation

See [server/README.md](server/README.md) for detailed API documentation including:
- Available endpoints
- Database models
- Configuration setup
- Deployment instructions

## Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/portfolio
PORT=5000
JWT_SECRET=your_jwt_secret_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
```

## Deployment

- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Render.com

## Technologies Used

- **Frontend**: Next.js, React, TailwindCSS, Framer Motion
- **Backend**: Express.js, MongoDB, Mongoose, Nodemailer
- **Database**: MongoDB Atlas
