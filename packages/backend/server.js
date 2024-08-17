import express from "express";
import cors from "cors";
import fileupload from "express-fileupload";

const app = express();

app.use(cors());
app.use(fileupload());

const PORT = 300;

app.get("/", (req, res) => {
  res.send("Server ON");
});

app.post("/api/upload", (req, res) => {
  res.json({
    success: true,
    message: "File uploaded",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
