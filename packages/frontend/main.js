// import "./style.css";
import "filepond/dist/filepond.css";
import * as FilePond from "filepond";

const inputEl = document.querySelector("input[type=file]");
const formEl = document.querySelector("#form");

const filepond = FilePond.create(inputEl);

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log("submitting");

  filepond.setOptions({
    server: "http://localhost:3000/api/upload",
  });

  filepond
    .processFiles()
    .then(() => {
      console.log("files send");
    })
    .catch((error) => {
      console.log("error sending", error);
    });
});
