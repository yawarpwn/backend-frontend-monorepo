import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "node:path";

const app = express();

app.use(cors());

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Server ON");
});

app.post(
  "/api/upload",
  fileUpload({
    fileSize: 30000000, // Around 30MB
    abortOnLimit: true,
  }),
  (req, res) => {
    const { images } = req.files;

    if (!images) res.sendStatus(400);
    // If doesn't have image mime type prevent from uploading
    if (!/^image/.test(images.mimetype)) return res.sendStatus(400);

    const uploadPath = path.join(import.meta.dirname + "/../uploads/");

    images.mv(uploadPath + images.name);

    console.log(images);

    res
      .json({
        status: "success",
        message: "File uploaded",
      })
      .status(200);
  },
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
