# Job Queue Backend

This is the backend service for the Job Queue system. The backend is responsible for managing job creation, processing jobs in the queue, and interacting with external APIs like Unsplash to fetch random food images. The app uses **Node.js**, **Express**, **MongoDB** (via Mongoose), **Bull** (for job queues), and **Joi** for validation.

## Core Features

- **Job Queue Management**: Manages job creation, job execution, and job retrieval using the Bull queue and Redis.
- **MongoDB Integration**: Stores job data and other relevant information.
- **Validation**: Uses Joi to validate request bodies.
- **Concurrency**: Handles concurrent job processing with Bull.
- **Unsplash API Integration**: Fetches random images from the Unsplash API for jobs.

## Folder Structure

Here's the project structure:

```bash
.
├── constants/
│   └── # Contains constants and configuration variables.
│
├── controllers/
│   └──# Implements business logic for handling job creation, retrieval, and updates.
│
├── database/
│   └── # MongoDB connection setup using Mongoose.
│
├── job/
│   └── # Defines the Bull job queue for concurrent job handling.
│
├── middleware/
│   └── # Middleware for validating request bodies using Joi.
│
├── model/
│   └── # Job model definition for MongoDB using Mongoose schema.
│
├── repository/
│   └── # Database actions like creating, updating, and getting data from MongoDB.
│
├── routes/
│   └── # Defines the routes for the application (e.g., job creation, job retrieval).
│
├── utils/
│   └── # Reusable utility functions.
│
├── validator/
│   └── # DTO schema definitions for Joi to handle request body validation.
│
├── types
│   └── # Application-wide TypeScript types.
│
└── index.ts
    └── # Main entry point for the application.
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash

PORT = 8080 # Port the app will run on
NODE_ENV = development # Node environment (development/production)

REDIS_HOST = localhost # Redis host for Bull
REDIS_PORT = 6379 # Redis port for Bull

UNSPLASH_PHOTO_API = https://api.unsplash.com/photos/random # Unsplash API endpoint to get random photos
UNSPLASH_CLIENT_ID = your-unsplash-client-id # Your Unsplash API client ID
UNSPLASH_PHOTO_TOPIC_ID = unsplash-topic-id # The Unsplash topic ID for photos
```

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or higher)
- **Redis** (for Bull queue)
- **MongoDB** (for job data storage)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hammad177/calo-task-backend.git
   cd calo-task-backend
   ```
2. Install dependencies:
   ```bash
    npm install
    # or
    yarn install
   ```
3. Set up the `.env` file as described above.

4. Start **Redis** and **MongoDB** server.

5. Start the development server:
   ```bash
    npm run dev
    # or
    yarn dev
   ```
6. The app should now be running on:
   ```bash
    http://localhost:8080
   ```

### API Endpoints

1. **POST /jobs:** Creates a new job to fetch and run job to fetch random food image.
2. **GET /jobs:** Fetches all jobs with their current status.
3. **GET /jobs/:joiId:** Fetches the status and result of a specific job by ID.
