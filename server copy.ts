import express from "express";
import { Request, Response } from "express";

const app = express();
const port = "8080";
app.use(express.json());

let tasks = [
  {
    id: 1,
    name: "Bat",
  },

  {
    id: 2,
    name: "Bold",
  },
];

app.get("/student/:name", (req: Request, res: Response) => {
  const { name } = req.body;

  const foundedTasks = tasks.find((task) => task.name === name);

  res.status(200).send(foundedTasks);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
