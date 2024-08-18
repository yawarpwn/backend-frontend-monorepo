import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import * as FilePond from "filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

const inputEl = document.querySelector("input[type=file]");
const sendButtoEl = document.querySelector("#send-button");
FilePond.registerPlugin(FilePondPluginImagePreview);

const filepond = FilePond.create(inputEl);

sendButtoEl.addEventListener("click", () => {
  filepond.setOptions({
    server: {
      url: "http://localhost:3000/api/upload",
    },
  });

  filepond
    .processFiles()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});
