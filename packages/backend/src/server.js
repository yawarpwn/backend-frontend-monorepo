import express from "express";
import cors from "cors";
import fs from "node:fs";
import fileUpload from "express-fileupload";
import Ftp from "ftp";

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
    // const { images } = req.files;
    //
    // if (!images) res.sendStatus(400);
    // // If doesn't have image mime type prevent from uploading
    // if (!/^image/.test(images.mimetype)) return res.sendStatus(400);

    const client = new Ftp();

    client.on("ready", () => {
      console.log("Conectado al servidor FTP");
      fs.readFile("uploads/njj-wallpaper.jpg", (error, data) => {
        if (error) throw error;

        client.put(data, "/public_html/assets/wallpaper.jpg", (error) => {
          if (error) throw error;
          console.log("archivo subido exitosamente");
          client.end();
        });
      });
    });

    client.on("error", (error) => {
      console.log("Error al conectar al servidor FTP", error);
      client.end();
    });

    client.connect({
      host: "ftp.tellsenales.com",
      user: "neyda@tellsenales.com",
      password: "Ne071020$",
      port: 21,
    });

    // const uploadPath = path.join(import.meta.dirname + "/../uploads/");
    //
    // images.mv(uploadPath + images.name);
    //
    // console.log(images);

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
