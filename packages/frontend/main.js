// import "./style.css";
document.addEventListener("DOMContentLoaded", () => {
  const skeleton = document.querySelector(".image-skeleton");
  const image = document.querySelector("#main-image");
  const src = image.getAttribute("src");
  console.log(src);

  fetch(src)
    .then((res) => res.blob())
    .then((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onloadend = () => {
        image.src = reader.result;
        skeleton.classList.add("hidden");
        image.classList.remove("hidden");
      };
    });
});

class lazyImage extends HTMLImageElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log("connected callback");
    this.src = this.getAttribute("src");
  }
}

window.customElements.define("lazy-image", lazyImage);
