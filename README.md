# React Login Pages Application

This project is a full-stack authentication application with a React frontend and NestJS backend.

## Running the Application with Docker

This application uses Docker Compose to run both the frontend and backend services together with a MongoDB database.

### Prerequisites

- Docker
- Docker Compose (usually included with Docker Desktop)

### Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd react-login-pages
   ```

2. Start the application using Docker Compose:
   ```bash
   docker-compose -f docker-compose.dev.yml up
   ```

   This command will:
   - Build the frontend and backend Docker images
   - Start the MongoDB database
   - Launch both services with proper environment configurations

3. Access the application:
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:3000](http://localhost:3000)

## Docker Services

The `docker-compose.dev.yml` file contains three services:

- `frontend`: React application running on port 5173
- `backend`: NestJS API running on port 3000
- `mongodb`: MongoDB database running on port 27017

## Development Mode

The Docker Compose configuration is set up for development, with:

- Source code mounted as volumes for live updates
- Hot reloading enabled on both frontend and backend
- Environment variables configured for local development

## Stopping the Application

To stop the running containers:
```bash
docker-compose -f docker-compose.dev.yml down
```

To stop and remove all data (including the MongoDB volume):
```bash
docker-compose -f docker-compose.dev.yml down -v
```

## Troubleshooting

If you encounter issues:
```bash
docker-compose -f docker-compose.dev.yml logs
```

Check Docker logs:
```bash
docker-compose -f docker-compose.dev.yml logs
```

For service-specific logs:
```bash
docker-compose -f docker-compose.dev.yml logs frontend
docker-compose -f docker-compose.dev.yml logs backend
```

Rebuild the containers if needed:
```bash
docker-compose -f docker-compose.dev.yml build --no-cache
docker-compose -f docker-compose.dev.yml up
```

## Features

- User registration and login
- JWT authentication
- Protected routes
- Form validation
- Responsive design