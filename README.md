React Login Pages Application
This project is a full-stack authentication application with a React frontend and NestJS backend.

Running the Application with Docker
This application uses Docker Compose to run both the frontend and backend services together with a MongoDB database.

Prerequisites
Docker
Docker Compose (usually included with Docker Desktop)
Getting Started
Clone the repository:

Start the application using Docker Compose:

This command will:

Build the frontend and backend Docker images
Start the MongoDB database
Launch both services with proper environment configurations
Access the application:

Frontend: http://localhost:5173
Backend API: http://localhost:3000
Docker Services
The docker-compose.dev.yml file contains three services:

frontend: React application running on port 5173
backend: NestJS API running on port 3000
mongodb: MongoDB database running on port 27017
Development Mode
The Docker Compose configuration is set up for development, with:

Source code mounted as volumes for live updates
Hot reloading enabled on both frontend and backend
Environment variables configured for local development
Stopping the Application
To stop the running containers:

To stop and remove all data (including the MongoDB volume):

Troubleshooting
If you encounter issues:

Check Docker logs:

For service-specific logs:

Rebuild the containers if needed:

Features
User registration and login
JWT authentication
Protected routes
Form validation
Responsive design