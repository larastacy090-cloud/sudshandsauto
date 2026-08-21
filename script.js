const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelector('#service-select').value = link.dataset.service;
  });
});

const slides = [...document.querySelectorAll('.gallery-slide')];
const dots = [...document.querySelectorAll('.dot')];
let currentSlide = 0;

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === currentSlide));
  dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === currentSlide));
}

document.querySelector('.prev').addEventListener('click', () => showSlide(currentSlide - 1));
document.querySelector('.next').addEventListener('click', () => showSlide(currentSlide + 1));
dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
setInterval(() => showSlide(currentSlide + 1), 6500);

const form = document.querySelector('#booking-form');
const status = document.querySelector('.form-status');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const details = new FormData(form);
  const name = details.get('name');
  const subject = encodeURIComponent(`Wash appointment request from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nContact: ${details.get('contact')}\nService: ${details.get('service')}\nPreferred day: ${details.get('date')}`);
  window.location.href = `mailto:sudshandcarwash@gmail.com?subject=${subject}&body=${body}`;
  status.textContent = 'Your email app is opening with the appointment request ready to send.';
});

document.querySelector('#loyalty-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const loyaltyForm = event.currentTarget;
  loyaltyForm.querySelector('.form-status').textContent = 'You are on the list. We will save your next sixth wash.';
  loyaltyForm.reset();
});

const openStatus = document.querySelector('#open-status');
const currentHour = new Date().getHours();
if (currentHour < 8 || currentHour >= 19) {
  openStatus.textContent = 'Closed right now';
  openStatus.parentElement.querySelector('small').textContent = 'Opens at 8:00 AM';
}
