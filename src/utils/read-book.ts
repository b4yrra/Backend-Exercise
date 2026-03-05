import fs from "node:fs/promises";
import { Book } from "./lib/types.js";

export const readBooks = async () => {
  try {
    const data = await fs.readFile("./data.json", { encoding: "utf8" });

    const books: Book[] = JSON.parse(data);

    return books;
  } catch (err) {
    console.log(err);
    return [];
  }
};
