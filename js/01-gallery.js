import { galleryItems } from "./gallery-items.js";
// Change code below this line

const imagesContainer = document.querySelector(".gallery");
const imagesMarkup = createPictureGallary(galleryItems);
imagesContainer.insertAdjacentHTML("beforeend", imagesMarkup);

function createPictureGallary(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}

imagesContainer.addEventListener("click", (eve) => {
  eve.preventDefault();

  // якщо не картинка - виходимо

  if (eve.target.nodeName !== "IMG") {
    return;
  }
  // якщо картинка, то виводимо зображення за допомогою бібліотеки

  const urlBigImage = eve.target.getAttribute("data-source");

  const instance = basicLightbox.create(
    `
    <img src="${urlBigImage}" width="800" height="600">
`,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", (eve) => {
          eve.preventDefault();
          if (eve.code === "Escape") {
            instance.close();
          }
        });
      },
      onClose: (instance) => {
        document.removeEventListener("keydown", eve);
      },
    }
  );

  instance.show();

  //   // закриття по Esc
});
// console.log(basicLightbox);
