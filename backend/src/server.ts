import express from "express";

const app = express();

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

app.listen(8090, () => {
  console.log("Server started on port 8090");
});
