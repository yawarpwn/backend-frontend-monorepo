import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";

const app = express();

app.use(fileUpload());
app.use(cors());

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Server ON");
});

app.post("/api/upload", (req, res) => {
  const { files } = req.files;
  console.log(files);

  // if (!files) return;
  // console.log(files);

  res
    .json({
      status: "success",
      message: "File uploaded",
    })
    .status(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
