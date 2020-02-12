# restfulORM
Simple MVC-like REST API backend built using Express

## Supported DBMS
* MySQL 5.7
* MariaDB

## Installation
1. Clone this project
```
git clone https://github.com/itsfaqih/restfulORM.git
cd restfulORM
npm i
```

2. Setup database configuration
```
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
```
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
```
// controller/userController.js (you can create your own)

'use strict';

const Controller = require('./Controller.js')
const User = require('../model/User.js') // import the model

const UserController = new Controller(User) // pass the model

module.exports = UserController
```

### Routes
```
// routes.js
  {
      endpoint: '/users', // set the endpoint url
      controller: require('./controller/userController.js') // import the controller
  }
```

### Deploy
```
npm run start
```
It will run on port 3000 by default, open localhost:3000/{endpoint} to see the result
