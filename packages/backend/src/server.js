import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";

const app = express();

app.use(cors());
app.use(fileUpload());

const PORT = 3000;

app.use("/", (req, res) => {
  res.send("Server ON");
});

app.post("/api/upload", (req, res) => {
  res.status({
    status: "success",
    message: "File uploaded",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
