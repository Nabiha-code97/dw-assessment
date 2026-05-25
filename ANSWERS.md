1. How to run

Install nodejs and mongo first. Run backend with cd server, npm install, npm run dev and then run frontend in another terminal with cd client, npm install, npm run dev.

Backend is at http://localhost:4000 and frontend is at http://localhost:5173.

2. Stack choice

I chose React, Node.js, Express and MongoDB as they are appropriate for a full stack CRUD task management app. React's job is to handle re-useable UI, APIs with Express and task data is flexible with MongoDB.

Using localStorage alone would not be a good option since it would not provide information about backend APIs, database use, or correct client server architecture.

The following is a sample of a real edge case:

There is no handling for empty task names in the app, in the taskController.js file in server/src/controllers. The API will return 400 and "Title is required" rather than invalid data will be saved if no title is provided.

If this check is not included, then new tasks might be created and displayed in the UI.

4. AI usage

Utilized AI to help with project structure, backend/frontend organization, and documentation formatting and debugging. I checked and edited the output as per my project needs.

The one change I would make is to keep all of the Task names consistent through the model, controller, routes and front end API calls.

5. Honest gap

Authentication isn't good enough, one thing not good enough. Currently, there is no user association with task.

In another day I would add JWT login/signup so that each user can access only his/her own tasks securely.