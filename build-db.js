'use strict';

let models = require("./models");
let { directors } = require("./seeders/data/directors");
let { shows } = require("./seeders/data/shows");
let { users } = require("./seeders/data/users");

models.sequelize.sync({ force: true })
.then( () => {
  return models.Director.bulkCreate(directors)
})
.then( () => {
  return models.Show.bulkCreate(shows)
})
.then( () => {
  return models.User.bulkCreate(users)
})
.then( () => {
  process.exit();
});

