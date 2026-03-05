import express from "express";
import { Request, Response } from "express";
import { readBooks } from "./utils/read-book.js";
import { writeBook } from "./utils/write-book.js";

const app = express();
const port = "3001";
app.use(express.json());

let tasks = [
  {
    id: 1,
    inputValue: "saldjfk",
    isDone: false,
  },

  {
    id: 2,
    inputValue: "saldjfk",
    isDone: false,
  },

  {
    id: 3,
    inputValue: "saldjfk",
    isDone: false,
  },

  {
    id: 4,
    inputValue: "saldjfk",
    isDone: false,
  },
];

app.get("/tasks", (req: Request, res: Response) => {
  res.status(200).send(tasks);
});

app.get("/tasks/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const task = tasks.find((task) => {
    String(task.id) === id;
  });

  res.status(200).send(task);
});

app.post("/tasks", (req: Request, res: Response) => {
  const { inputValue } = req.body;

  const newTaskId = tasks.length + 1;

  const newTask = { id: newTaskId, inputValue, isDone: false };

  tasks.push(newTask);
  res.send(tasks);
});

app.put("/update-task/:id", (req: Request, res: Response) => {
  const { inputValue, isDone } = req.body;
  const { id } = req.params;

  const NewTasks = tasks.map((task) => {
    if (String(task.id) === id) {
      const newTask = {
        id: task.id,
        inputValue,
        isDone,
      };

      return newTask;
    } else {
      return task;
    }
  });

  res.send(NewTasks);
});

app.delete("/delete-task/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const foundedTasks = tasks.find((task) => String(task.id) === id);

  if (!foundedTasks) {
    res.status(404).send({ message: "Not Found" });
    return;
  }

  const filteredTasks = tasks.filter((task) => {
    task.isDone !== false;
  });

  tasks = filteredTasks;

  res.status(200).send({ message: "Successfully" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

///// Exercise 1

app.get("/students/:name/:id", (req: Request, res: Response) => {
  const { name, id } = req.params;

  res.status(200).send(`Hello ${name}, ${id}`);
});

/////// Exercise 2

app.get("/Filter", (req: Request, res: Response) => {
  const a = req.query.city;
  const b = req.query.age;

  res.json({ a, b });
});

/////// Exercise 3

app.get("/", (req: Request, res: Response) => {
  const Author = req.headers.authorization;
  const User = req.headers["user-agent"];

  console.log({ Author, User });
});

/////// Exercise 4

app.get("/books", async (req: Request, res: Response) => {
  const books = await readBooks();

  if (!books) {
    return res.status(500).json({ message: "Failed", books: [] });
  }

  res.status(200).send({ message: "Succed", books: books });
});

app.get("/books/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const books = await readBooks();

  const findBook = books?.find((book) => String(book.id) === id);

  res.status(200).send({ message: "Succes", books: findBook });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/books", async (req: Request, res: Response) => {
  const { title, author } = req.body;
  const books = await readBooks();

  const newBookId = new Date().getTime();

  const newBook = { id: newBookId, title, author };

  const updateBook = [...books, newBook];

  await writeBook(updateBook);

  res.send(books);
});

app.put("/books", async (req: Request, res: Response) => {
  const books = await readBooks();

  const updatedBooks = books.map((book) => {
    const bookAuthor = book.author;

    if (bookAuthor.includes("BAt")) {
      const newBooks = {
        id: book.id,
        title: book.title,
        author: "J.K Rowling",
      };

      return newBooks;
    } else {
      return book;
    }
  });

  res.send(updatedBooks);
});

app.delete("/books", async (req: Request, res: Response) => {
  const books = await readBooks();
});
