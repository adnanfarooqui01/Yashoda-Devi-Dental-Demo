const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");
const appointmentForm = document.querySelector("#appointment-form");
const clinicWhatsApp = "917499346438";

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    menuButton.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("is-open", !isExpanded);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("is-open");
    }
  });
}

const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());

if (appointmentForm instanceof HTMLFormElement) {
  const dateInput = appointmentForm.elements.namedItem("date");
  if (dateInput instanceof HTMLInputElement) {
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60_000)
      .toISOString()
      .slice(0, 10);
    dateInput.min = localToday;
  }

  appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!appointmentForm.reportValidity()) return;

    const formData = new FormData(appointmentForm);
    const message = [
      "Hello Yashoda Devi Dental Clinic, I would like to request an appointment.",
      "",
      `Name: ${formData.get("name")}`,
      `Phone: ${formData.get("phone")}`,
      `Preferred date: ${formData.get("date")}`,
      `Reason for visit: ${formData.get("service")}`,
      formData.get("message") ? `Message: ${formData.get("message")}` : "",
      "",
      "Please let me know if this time is available.",
    ]
      .filter(Boolean)
      .join("\n");
    const whatsappUrl = `https://wa.me/${clinicWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
}

const heroSlides = [...document.querySelectorAll(".hero-slide")];
const heroDots = [...document.querySelectorAll(".hero-dots button")];
let activeHeroSlide = 0;

function showHeroSlide(index) {
  activeHeroSlide = index;
  heroSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === index);
    heroDots[slideIndex]?.classList.toggle("is-active", slideIndex === index);
    heroDots[slideIndex]?.setAttribute("aria-selected", String(slideIndex === index));
  });
}

heroDots.forEach((dot, index) => {
  dot.addEventListener("click", () => showHeroSlide(index));
});

if (heroSlides.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.setInterval(() => showHeroSlide((activeHeroSlide + 1) % heroSlides.length), 6000);
}
