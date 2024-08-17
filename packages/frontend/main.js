// import "./style.css";
import "filepond/dist/filepond.min.css";
import * as FilePond from "filepond";

const inputEl = document.querySelector("input[type=file]");
const sendButtoEl = document.querySelector("#send-button");
FilePond.create(inputEl);

sendButtoEl.addEventListener("click", () => {
  console.log("click");
});
