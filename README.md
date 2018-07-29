# react-express-crm

Install the required node modules:

```
$ npm install
```

Configure the database:

```sh: /config/config.json

"development": {
    "username": "your_db_username",
    "password": "your_db_password",
    "database": "your_db_name",
    "host": "localhost",
    "dialect": "postgres",
    "logging": false
}
```

Finally, run the database migrations:

```
$ npm run dbmigrate
```

### Running the tests

```
$ npm test              # Run all tests

$ npm run test-server   # Run server tests (API, Auth)

$ npm run test-client   # Run client tests (Redux)
```

### Running the app

In a terminal window, run `npm run build` to compile the React app. `webpack` in watch mode will recompile your React app whenever it changes:

```
$ npm run build
```

In another terminal window, run `npm start` to start the Express server. `nodemon` will recompile the Express app whenever it changes:

```
$ npm start
```
# react-express-crm
