import express from "express";

import usersRouter from "./routes/users";
import pizzaRouter from "./routes/pizzas";
import drinkRouter from "./routes/drinks";
import filmRouter from "./routes/films";

import { ErrorRequestHandler } from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let counter: number = 0;
let counter2: number = 0;
let counter3: number = 0;
let counter4: number = 0;
const requestCounter: express.RequestHandler = (req, _res, next) => {
  if (req.method === "GET") {
    if (req.path === "/") {
      counter++;
    }
    if (req.path === "/pizzas") {
      counter2++;
    }
  }
  if (req.method === "POST") {
    counter3++;
  }
  if (req.method === "DELETE") {
    counter4++;
  }
  console.log(`Request counter :
  - GET / : ${counter}
  - GET /pizzas : ${counter2}
  - POST /pizzas : ${counter3}
  - DELETE /pizzas : ${counter4}`);
  next();
};

app.use(requestCounter);

app.use("/users", usersRouter);
app.use("/pizzas", pizzaRouter);
app.use("/drinks", drinkRouter);
app.use("/films", filmRouter);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error(err.stack);
    return res.status(500).send("Something broke!");
};
  
app.use(errorHandler);  

export default app;
