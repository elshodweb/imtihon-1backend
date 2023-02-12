import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

function read(name) {
  return JSON.parse(readFileSync(resolve("database", name + ".json"), "utf-8"));
}

function write(name, data) {
  return writeFileSync(
    resolve("database", name + ".json"),
    JSON.stringify(data, null, 2)
  );
}

export { write, read };
