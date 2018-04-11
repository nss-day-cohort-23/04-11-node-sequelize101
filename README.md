This repo contains a (very) basic Express app that demonstrates the Sequelize ORM.
Here's how to get it up and running:
```bash
npm install
npm start
```

Create a database with PSQL to hook up to the app:
```bash
psql
yourname=# create database mydb_name
```

Add the database name to config/config.json's "development" property:
```js
 "development": {
    "username": "root",
    "password": null,
    "database": "mydb_name",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
```
For Windows users: replace "root" and null with your postgres user info
Mac users, delete those properties.

run `node db-build.js` to generate your tables and populate the newly created tables with the dummy data.

To add new models to the app, from the project root run something like this:
```bash
sequelize model:create --name Foo --attributes foo_bar:string,baz:boolean,fizz:integer
```

Run `node db-build.js` again to make Sequelize generate a new table based on the model you created.
