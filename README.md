# Todos App

A full-stack Task Manager app built with React, Node.js, Express, and MongoDB.

## Features

- Create task
- View all tasks
- Update task
- Delete task
- Mark task as completed or pending
- Search tasks
- Filter by priority
- Filter by status
- Light/dark theme

## Tech Stack

Frontend:
- React
- Context API
- Plain CSS
- Axios

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose

## How to Run

Make sure Node.js and MongoDB are installed.

### Backend

```bash
cd server
npm install

Create a .env file inside the server folder:

PORT=[PORT]
MONGO_URI=mongodb://127.0.0.1:27017/task_app

Run backend:

npm run dev

Backend runs on:

Frontend

Open another terminal:

cd client
npm install
npm run dev

Frontend runs on:

API Routes
GET     /api/tasks
POST    /api/tasks
GET     /api/tasks/:id
PUT     /api/tasks/:id
DELETE  /api/tasks/:id
PATCH   /api/tasks/:id/status
GET     /api/tasks?search=task
GET     /api/tasks?priority=high
GET     /api/tasks?status=completed