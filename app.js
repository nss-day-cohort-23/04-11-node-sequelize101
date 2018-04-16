"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("models", require("./models"));
const models = app.get("models");
const { User, Show, Director } = app.get("models");

// middleware stack
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public", { extensions: "html" }));

app.get("/shows", (req, res, next) => {
  Show.findAll({ include: [{ model: Director, attributes: ["name"] }] })
    .then(shows => {
      res.status(200).json(shows);
    })
    .catch(err => {
      console.log("ooops", err);
      res.status(500).json({ error: err });
    });
});

app.get("/shows/:id", (req, res, next) => {
  Show.findOne({
    raw: true,
    where: { id: req.params.id },
    include: [{ model: Director, attributes: ["name"] }]
  })
    .then(show => {
      res.status(200).json(show);
    })
    .catch(err => {
      // blah
    });
});

app.patch("/shows/:id", ({ params: { id }, body: { updates } }, res, next) => {
  Show.find({ where: { id } })
    .then(obj => {
      return obj.updateAttributes(updates);
    })
    .then(updatedShow => {
      res.status(201).json(updatedShow);
    });
});

// add Fave for a user
app.post("/favorites", ({ body: { UserId, ShowId } }, res, next) => {
  User.findById(UserId).then(foundUser => {
    foundUser.addFavorite(ShowId).then(newRecord => {
      res.status(201).json(newRecord);
    });
  });
});

app.put("/users/:id", (req, res, next) => {
  User.findById(req.params.id).then(foundUser => {
    const func = req.body.ShowId ? "addFavorite" : "update";
    foundUser[func](req.body.ShowId || req.body).then(item => {
      res.status(201).json(item);
    });
  });
});

app.get('/users/:id/favorites', ({params: { id }}, res, next) => {
  User.findById(id)
  .then( foundUser => {
    foundUser.getFavorites().then( faves => {
      let userName = foundUser.getFullName();
      const faveObj = { userName, faves }
      res.status(200).send(faveObj);
    });
  });
});

// director routes
app.post("/directors", (req, res, next) => {
  console.log("req.body", req.body);
  Director.create(req.body).then(data => {
    // We get the added obj back with its ID. AWESOME
    console.log("New director", data.name);
    res.json(data);
  });
});

// error handler to catch all the errors handed down from the routes
app.use((err, req, res, next) => {

})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
