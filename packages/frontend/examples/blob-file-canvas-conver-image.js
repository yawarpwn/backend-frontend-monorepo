const getBase64StringFromDataURL = (string) =>
  string.replace("data:", "").replace(/^.+,/, "");

const inputEl = document.querySelector("input[type=file]");

//Canvas to base64
function canvasToBase64() {
  const canvas = document.querySelector("#canvas");
  const dataUrl = canvas.toDataURL();
  const base64 = getBase64StringFromDataURL(dataUrl, "image/jpg", 0.5);
  return base64;
}

//Image to base
function imageToBase64() {
  const image = document.getElementById("my-image");

  // Get the remote image as a Blob with the fetch API
  fetch(image.src)
    .then((res) => res.blob())
    .then((blob) => {
      // Read the Blob as DataURL using the FileReader API
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
        // Logs data:image/jpeg;base64,wL2dvYWwgbW9yZ...

        // Convert to Base64 string
        const base64 = getBase64StringFromDataURL(reader.result);
        console.log(base64);
        // Logs wL2dvYWwgbW9yZ...
      };
      reader.readAsDataURL(blob);
    });
}

//transform format
function transformFormat() {
  const image = document.getElementById("my-image");

  const toDataURL = () => {
    const canvas = document.createElement("canvas");

    // We use naturalWidth and naturalHeight to get the real image size vs the size at which the image is shown on the page
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    // We get the 2d drawing context and draw the image in the top left
    canvas.getContext("2d").drawImage(image, 0, 0);

    // Convert canvas to DataURL and log to console
    const dataURL = canvas.toDataURL();
    console.log(dataURL);
    // logs data:image/png;base64,wL2dvYWwgbW9yZ...

    // Convert to Base64 string
    const base64 = getBase64StringFromDataURL(dataURL);
    console.log(base64);
    // Logs wL2dvYWwgbW9yZ...
  };

  // If the image has already loaded, let's go!
  if (image.complete) toDataURL(image);
  // Wait for the image to load before converting
  else image.onload = toDataURL;
}
