import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import fs from "fs/promises";
import sharp from "sharp";

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

  async (req, res) => {
    const { images } = req.files;

    if (!images) console.log("no images provided");

    try {
      const { mimetype } = images;

      //resize and save thumb Image
      const thumbImage = await sharp(images.data)
        .resize(200)
        .toFile("assets/thumb.jpg");

      const originalImageBuffer = await sharp(images.data)
        .resize(undefined, 1000)
        .toBuffer();

      const metadata = await sharp(originalImageBuffer).metadata();

      const waterMarkWidth = Math.round(metadata.width * 0.9);

      //Resize watermark image to 90% width
      const waterMarkBuffer = await sharp("watermark-tellsenales-logo.svg")
        .resize(waterMarkWidth)
        .toBuffer();

      //Generate watermark
      const watermarkedImage = await sharp(originalImageBuffer)
        .composite([
          {
            input: waterMarkBuffer,
            gravity: "center",
          },
        ])
        .sharpen()
        .withMetadata()
        .toFile("assets/watermark.jpg");

      fs.writeFile("assets/original.jpg", originalImageBuffer);
    } catch (error) {
      console.log(error);
      res
        .json({
          status: "fail",
          message: "error",
        })
        .status(500);
    }
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
