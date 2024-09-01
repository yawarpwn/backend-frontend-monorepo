import { addTextWatermark, addImageWatermark } from "sharp-watermark";

async function main() {
  const options = {
    ratio: 0.4,
    dpi: 300,
    opacity: 0.6,
    position: "center",
    x: undefined,
    y: undefined,
  };

  const watermarkedImage = await addImageWatermark(
    "uploads/njj-wallpaper.jpg",
    "watermark-tellsenales-logo.svg",
    options,
  );

  watermarkedImage.toFile("wm.jpg");
  // const watermarkedImage = await addTextWatermark(
  //   "uploads/njj-wallpaper.jpg",
  //   "Tellsenales.com",
  //   {
  //     // ratio?: number;
  //     // dpi?: number;
  //     opacity: 1,
  //     position: "center",
  //     // x?: number;
  //     // y?: number;
  //   },
  // );
  // watermarkedImage.toFile("watermarked.jpg");
}

main();
