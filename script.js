document.querySelector("#year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const lightbox = document.querySelector("#screenshot-lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const lightboxCounter = document.querySelector("#lightbox-counter");
const previousButton = lightbox.querySelector(".lightbox-prev");
const nextButton = lightbox.querySelector(".lightbox-next");
const closeButton = lightbox.querySelector(".lightbox-close");

let galleryImages = [];
let galleryCaptions = [];
let galleryIndex = 0;

const renderScreenshot = () => {
  lightboxImage.src = galleryImages[galleryIndex];
  lightboxImage.alt = galleryCaptions[galleryIndex] || "Project screenshot";
  lightboxCaption.textContent = galleryCaptions[galleryIndex] || "Project screenshot";
  lightboxCounter.textContent = `${galleryIndex + 1} / ${galleryImages.length}`;
  previousButton.hidden = galleryImages.length < 2;
  nextButton.hidden = galleryImages.length < 2;
};

document.querySelectorAll(".screenshot-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    galleryImages = trigger.dataset.images.split("|");
    galleryCaptions = trigger.dataset.captions.split("|");
    galleryIndex = 0;
    renderScreenshot();
    lightbox.showModal();
  });
});

previousButton.addEventListener("click", () => {
  galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
  renderScreenshot();
});

nextButton.addEventListener("click", () => {
  galleryIndex = (galleryIndex + 1) % galleryImages.length;
  renderScreenshot();
});

closeButton.addEventListener("click", () => lightbox.close());

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});
