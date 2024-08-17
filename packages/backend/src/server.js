import express from "express";

const app = express();

const PORT = 3000;

app.use("/", (req, res) => {
  res.send("Server ON");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
