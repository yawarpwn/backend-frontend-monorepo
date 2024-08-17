// import "./style.css";
import "filepond/dist/filepond.min.css";
import * as FilePond from "filepond";

const inputEl = document.querySelector("input[type=file]");
const sendButtoEl = document.querySelector("#send-button");
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
