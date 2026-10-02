# TODO Application — Frontend
-----------------------------
React frontend for the TODO management application.

## Tech Stack
--------------------
* React
* TypeScript
* Vite
* Tailwind CSS
* Axios
* React Router
* React Hook Form
* React Query
* Zod

## Features
--------------------
* View all TODOs
* Create a TODO
* Edit a TODO
* Mark a TODO as completed or open
* Delete a TODO
* Form validation
* Loading states
* Error handling
* Confirmation dialogs for destructive actions
* Responsive user interface

## Prerequisites
--------------------
Make sure the following are installed:

* Node.js 18+
* npm
* Backend API running locally or a deployed backend API

## Setup
--------------------
1. Navigate to the frontend directory: cd client
2. Install dependencies: npm install

## Environment Variables
--------------------
1. Create a .env file in the frontend directory:

VITE_API_URL specifies the base URL of the backend REST API.

For example: VITE_API_URL=http://localhost:3001/api

If the backend is deployed, replace this with the deployed API URL.

## Run the Application
--------------------
Start the development server: npm run dev

The frontend will normally be available at: http://localhost:5173

## Production Build
--------------------
To create a production build: npm run build

To preview the production build locally: npm run preview

## Backend Dependency
--------------------
The frontend requires the backend API to be running and accessible through the configured VITE_API_URL.

The frontend communicates with the following REST endpoints:

GET    /api/todos
POST   /api/todos
PUT    /api/todos/:id
PATCH  /api/todos/:id/done
DELETE /api/todos/:id

## Assumptions & Limitations
--------------------
1. The application does not include user authentication or registration because authentication was not part of the assignment requirements.
2. TODOs are not associated with individual users.
3. The frontend depends on the backend API for persistent data.
4. Running MongoDB-backed backend is required for TODO data to persist.
5. The application is designed for the scope of the assignment and does not include advanced features such as real-time synchronization between multiple users.