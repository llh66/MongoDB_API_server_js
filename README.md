# Task tracking app with MongoDB
A server built with MongoDB and express.js.
## Set up and run project:
1. npm install
2. node .\server.js
3. The server should run on http://localhost:3000/, we may test it with a tool like Postman

## API endpoints:
### 1. Retrieve all tasks with optional filters: GET /api/tasks
Example: GET http://localhost:3000/api/tasks \
Body (optional):
{
    "filter":{
        "completed": true
    }
}

### 2. Retrieve a specific task by ID: GET /api/tasks/:id
Example: GET http://localhost:3000/api/tasks/66fd822f41639e404908c8f1

### 3. Create a new task: POST /api/tasks
Example: POST http://localhost:3000/api/tasks \
Body: 
{
    "title": "assignment 2",
    "description": "not posted yet",
    "dueDate": "11/01/2024",
    "priority": "high",
    "completed": false
}

### 4. Update an existing task: PATCH /api/tasks/:id
Example: PATCH http://localhost:3000/api/tasks/66fd83436b2693be618c71af \
Body: 
{
    "dueDate": "11/10/2024",
    "completed": false
}

### 5. Delete a task: DELETE /api/tasks/:id
Example: DELETE http://localhost:3000/api/tasks/66fd83436b2693be618c71af

## Additional features:

1. Filtering for GET
    - as mentioned in API endpoint 1. Users can filter the result with 'filter' attribute in request body. The response will only include documents with matched attribute values. For example, setting '{ "filter":{ "completed": true } }' to a request will only retrieve completed tasks.

2. Error handling
    - Date validation check that rejects any past dates for inserting and updating.
    - Setting enum values to 'priority' field to avoid invalid inputs. Setting runValidators to true when updating (PATCH) to ensure the updated values also match enum values.
    - Server-side error handling with try-catch, for errors from mongoose schema like wrong input types and missing required field (title).
    - Handling empty or undefined find results.
