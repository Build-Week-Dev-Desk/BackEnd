
# DevDesk Queue API Documentation

#### Backend deployed at [heroku](https://bwdevdesk.herokuapp.com/) <br>
#### Postman Documentation: https://documenter.getpostman.com/view/9969236/SWTEdx1A?version=latest
#### Deploy Site: https://dev-desk.now.sh/
--------------
## Technology Used

#### Database
- PostgresQL

#### Backend
- Node.js
- Express.js
- Knex.js
- JWT Token
- Bcrypt

#### Testing
- Jest
- Supertest

<br />

## User Type
DevDesk Que Backend consists of three types of users:
- **student** - can access ticket list, a single ticket, create, and delete a ticket
- **staff** - can claim a ticket, edit a solution to a ticket
- **both** - can access and edit all resources

<br />

## Database Schema

### Users
| Method | Data Type| Usage |
| ------ | -------  |-------|
| id     | Integer  | Primary Key|
| name   | String   | User's name|
| email  | String   | User's login |
| email  | String   | User's password|
| role   | String   | User's role|

### Tickets
| Method | Data Type| Usage |
| ------ | -------  |-------|
| id     | Integer  | Primary Key|
| title   | String   | Ticket's title/ topic as posted by student user|
| description  | String   | Ticket's description created by student user|
| status  | String   | Ticket status, can be **open**, **claimed**, or **closed**|
| attamptedSolutions | String   | Student's attempted solutions|
| category | String   | Ticket's category|
| solution | Object   | Default to null, where solution object will be assigned to|
| createdAt   |    | Automatically created upon ticket creation |

### Solutions

| Method | Data Type| Usage |
| ------ | -------  |-------|
| id     | Integer  | Primary Key|
| ticketId  | Integer   | Foreign Key, points to ticket ID |
| body   | String   | Solutions posted by staff user |
| answerer  | String   | Staff that response to this ticket |
| createdAt   |    | Automatically created upon solution creation |

<br />



## Endpoints

#### AUTHORIZATION ROUTES

| Method | Endpoint         | Access Control | Description                                 |
| ------ | ---------------- | -------------- | ------------------------------------------- |
| POST   | `/auth/register` | all users      | Creat a new user with preferred role |
| POST    | `/auth/login`    | all users    | Return tokens for designated user                       |

**Register**
```
{
  name: STRING
  email: STRING
  password: STRING
  role: STRING
}
```
**Login**
```
{
  email: STRING
  password: STRING
  role: STRING
}
```


#### TICKETS ROUTES

| Method | Endpoint          | Access Control | Description                       |
| ------ | ----------------- | -------------- | --------------------------------- |
| GET    | `/api/tickets`         | all users    | Returns list of all tickets |
| GET    | `/api/tickets/:id`       | all users    | Return a single ticket          |
| POST   | `/api/tickets`          | student / both users    | Create a new ticket with description and attempted solution  |
| PUT    | `/api/tickets/:id` | staff / both users    | Update ticket status to either "open", "claimed", or "closed"               |
| DELETE    | `/api/tickets/:id`         | student / both users    | Delete a ticket |

**POST Create New Ticket**
```
{
    title: STRING,
    status: STRING,
    description: STRING,
    attemptedSolutions: STRING,
    category: STRING
}
```
**POST Claim Ticket**
```
{
    status: STRING,
}
```

#### SOLUTIONS ROUTES

| Method | Endpoint      | Access Control | Description               |
| ------ | ------------- | -------------- | ------------------------- |
| POST    | `/api/tickets/:id/solutions` | staff / both users    | Add a solution to a ticket |
| PUT    | `/api/tickets/:id/solutions` | staff / both users    | Edit a solution of a ticket |
| DEL    | `/api/tickets/:id/solutions` | staff / both users    | Delete a solution of a ticket |

**POST & PUT Solutions**
```
{
    body: STRING,
}
```

#### USER TICKETS ROUTE

| Method | Endpoint      | Access Control | Description               |
| ------ | ------------- | -------------- | ------------------------- |
| GET    | `/api/mytickets` | all users    | Return a list of tickets the user. For **student**, the list will be the tickets created by the student. For **staff**, the list will be the tickets that was assigned to them
---
#### USER INFORMATION ROUTES

| Method | Endpoint      | Access Control | Description               |
| ------ | ------------- | -------------- | ------------------------- |
| GET    | `/api/user/:id` | the owner of the ID    | Return the user ID. Can only be accessed byt the owner of that ID
| PUT    | `/api/user/:id` | the owner of the ID    | Edit user information

```
{
  name: STRING
  email: STRING
  role: STRING
}
```

---

