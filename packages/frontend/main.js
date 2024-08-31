// import "./style.css";
import * as FilePond from "filepond";

const inputEl = document.querySelector("input[type=file]");

FilePond.create(inputEl);
console.log(inputEl);
