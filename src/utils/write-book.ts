import { Book } from "./lib/types.js";
import fs from "node:fs/promises";

export const writeBook = async (books: Book[]) => {
  try {
    await fs.writeFile("./data.json", JSON.stringify(books), "utf8");
  } catch (err) {
    console.log(err);
  }
};
