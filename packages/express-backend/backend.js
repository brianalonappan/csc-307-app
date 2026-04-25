import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userService from "./services/user-service.js";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users")
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name != undefined && job != undefined) {
    userService
      .findUserByNameAndJob(name, job)
      .then((result) => {
        res.send({ users_list: result });
      })
      .catch(() => {
        res.status(500).send("Internal server error.");
      });
  } else if (name != undefined) {
    userService
      .findUserByName(name)
      .then((result) => {
        res.send({ users_list: result });
      })
      .catch(() => {
        res.status(500).send("Internal server error.");
      });
  } else if (job != undefined) {
    userService
      .findUserByJob(job)
      .then((result) => {
        res.send({ users_list: result });
      })
      .catch(() => {
        res.status(500).send("Internal server error.");
      });
  } else {
    userService
      .getAllUsers()
      .then((result) => {
        res.send({ users_list: result });
      })
      .catch(() => {
        res.status(500).send("Internal server error.");
      });
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];

  userService
    .findUserById(id)
    .then((result) => {
      if (result === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(result);
      }
    })
    .catch(() => {
      res.status(500).send("Internal server error.");
    });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;

  userService
    .addUser(userToAdd)
    .then((newUser) => {
      res.status(201).send(newUser);
    })
    .catch(() => {
      res.status(500).send("Internal server error.");
    });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];

  userService
    .removeUserById(id)
    .then((result) => {
      if (result === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.status(204).send();
      }
    })
    .catch(() => {
      res.status(500).send("Internal server error.");
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});