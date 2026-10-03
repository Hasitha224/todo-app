## TODO Application — Backend
-----------------------------
REST API backend for the TODO management application, built with Node.js, Express.js, and MongoDB.

## Tech Stack
--------------------
* Node.js
* Express.js
* MongoDB
* Mongoose

## Features
--------------------
* Create TODOs
* Retrieve TODOs
* Update TODOs
* Mark TODOs as completed or open
* Delete TODOs
* Request validation
* MongoDB persistence
* CORS configuration
* Error handling

## Prerequisites
--------------------
Make sure the following are installed:

* Node.js 18+
* npm
* MongoDB Atlas account or a local MongoDB installation

## Setup
--------------------
1. Navigate to the backend directory: cd server
2. Install dependencies: npm install

## Environment Variables
--------------------
Create a .env file in the backend directory:
* Frontend URL allowed by CORSPORT -> Port used by the Express server
* FRONTEND_URL -> Frontend URL allowed by CORS
* MONGODB_URI -> MongoDB connection string

Do not commit the actual .env file to the repository.

## MongoDB Connection
--------------------
The application uses MongoDB for persistent TODO storage.

MongoDB Atlas can be used for a cloud-hosted database.

1. Create a MongoDB Atlas cluster.
2. Create a database user.
3. Configure the required network access/IP address.
4. Copy the MongoDB connection string.
5. Add it to the .env file as MONGODB_URI.

## Run the Backend
--------------------
Start the development server: nodemon

The backend will run normally at: http://localhost:3001

## API Endpoints
--------------------
| Method        | Endpoint              | Description               |
| ------------- | --------------------- | ------------------------- |
| GET           | /api/todos            | Get all TODOs             |
| GET           | /api/todos/:id        | Get a TODO by id          |   
| POST          | /api/todos            | Create a TODO             |
| PUT	        | /api/todos/:id        | Update a TODO             |
| PATCH	        | /api/todos/:id/done   | Mark TODO as done/undone  |
| DELETE	    | /api/todos/:id        | Delete a TODO             |

## Assumptions & Limitations
--------------------
1. The application does not include authentication or user registration because these were not part of the assignment requirements.
2. TODOs are shared and are not associated with individual users.
3. MongoDB is required for persistent storage.
4. The backend currently supports the functionality required by the assignment and does not include advanced features such as user authorization, real-time synchronization, or distributed caching.
5. The API is intended for the scope of this assignment rather than a large-scale production environment.
