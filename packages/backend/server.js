import express from "express";

const app = express();

const PORT = 300;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
