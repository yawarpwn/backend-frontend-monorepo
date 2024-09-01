import sharp from "sharp";

async function main() {
  sharp("uploads/njj-wallpaper.jpg")
    .resize(300)
    .toFile("resize.jpg")
    .then((data) => {
      const { format, width, height, channels, premultiplied, size } = data;
    })
    .catch((err) => console.log(err));
}

main();
