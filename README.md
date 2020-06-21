# autoRestful
Simple and easy to use automated MVC-like REST API backend built using Express.

This repo is now archived. Please use the better version instead: [autoRestfulPrisma](https://github.com/itsfaqih/autoRestfulPrisma)

## Supported DBMS
* MySQL 5.7
* MariaDB

## Installation
1. Clone this project
```
git clone https://github.com/itsfaqih/autoRestful.git
cd autoRestful
npm i
```

2. Setup database configuration
```javascript
// model/db.js

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db'
})
```

## Usage
### Model
```javascript
// model/User.js (you can create your own)

'use strict';

const Model = require('./Model.js')
const User = {
  ...Model,
  table: 'users', // table name
  foreign_id: 'mytable_id', // foreign key name (optional)
  hateoas: function (item) { // HATEOAS implementation (optional)
    return {
      link: [
        {
          href: `/posts?${this.foreign_id}=${item.id}`,
          rel: 'posts'
        }
      ]
    }
  }
}

module.exports = User
```

### Controller
```javascript
// controller/userController.js (you can create your own)

'use strict';

const Controller = require('./Controller.js')
const User = require('../model/User.js') // import the model

const UserController = new Controller(User) // pass the model

module.exports = UserController
```

### Routes
```javascript
// routes.js
  {
      endpoint: '/users', // set the endpoint url
      controller: require('./controller/userController.js') // import the controller
  }
```

This will generate all restful endpoints as follows:
```
GET /users (get all user data)
POST /users (create new user)
GET /users/:id (get one user data)
PUT /users/:id (update user data)
DELETE /users/:id (delete user data)
```

NB: id parameter use a column named "id" by default.

### Deploy
```
npm run start
```
It will run on port 3000 by default, open localhost:3000/{endpoint} to see the result

## To Do
- [ ] Implement ORM library
- [ ] CLI for generating boilerplates
