import Ftp from "ftp";
import fs from "fs/promises";

async function main() {
  fs.readFile("uploads/njj-wallpaper.jpg")
    .then((res) => {
      const ftpClient = new Ftp();

      ftpClient.on("ready", () => {
        console.log("FTP SERVER connected");
        ftpClient.put(res, "wallpaper.jpg", (error) => {
          if (error) throw error;
          console.log("archivo subido exitosamente");
          ftpClient.end();
        });
      });

      ftpClient.on("error", (error) => {
        console.log(error);
        ftpClient.end();
      });

      ftpClient.connect({
        host: "ftp.tellsenales.com",
        user: "statics@tellsenales.com",
        password: "St071020$",
        port: 21,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

main();
