let currentSlide = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const products = [
    { id: 1, name: 'iPhone 15', price: 999 },
    { id: 2, name: 'MacBook Pro', price: 1999 },
    { id: 3, name: 'AirPods Pro', price: 249 },
    { id: 4, name: 'Smart Watch', price: 299 },
    { id: 5, name: 'High-End Laptop', price: 1299 },
    { id: 6, name: 'Pro Tablet', price: 599 },
    { id: 7, name: 'Wireless Headphones', price: 199 },
    { id: 8, name: 'Fast Charger', price: 49 }
];

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const closeMenu = document.getElementById('closeMenu');

hamburger.addEventListener('click', () => navMenu.classList.add('active'));
closeMenu.addEventListener('click', () => navMenu.classList.remove('active'));

// Search Bar
const searchIcon = document.getElementById('searchIcon');
const searchContainer = document.getElementById('searchContainer');
const closeSearch = document.getElementById('closeSearch');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchIcon.addEventListener('click', () => {
    searchContainer.style.display = 'block';
    searchInput.focus();
});

closeSearch.addEventListener('click', () => {
    searchContainer.style.display = 'none';
});

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    searchResults.innerHTML = '';
    if (!query) return;

    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    filtered.forEach(p => {
        const div = document.createElement('div');
        div.className = 'search-result';
        div.textContent = `${p.name} — $${p.price}`;
        div.onclick = () => {
            alert(`Selected: ${p.name}`);
            searchContainer.style.display = 'none';
        };
        searchResults.appendChild(div);
    });
});

// Cart
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const cartCountEl = document.getElementById('cartCount');

function updateCartDisplay() {
    localStorage.setItem('cart', JSON.stringify(cart));
    cartItemsEl.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * (item.quantity || 1);
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.name} × ${item.quantity || 1} — $${item.price}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsEl.appendChild(div);
    });

    cartTotalEl.textContent = total;
    cartCountEl.textContent = cart.reduce((sum, i) => sum + (i.quantity || 1), 0);
}

window.removeFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartDisplay();
};

document.addEventListener('click', e => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const id = +e.target.dataset.id;
        const name = e.target.dataset.name;
        const price = +e.target.dataset.price;

        const existing = cart.find(i => i.id === id);
        if (existing) {
            existing.quantity = (existing.quantity || 1) + 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        updateCartDisplay();
    }
});

cartIcon.addEventListener('click', () => {
    updateCartDisplay();
    cartModal.style.display = 'flex';
});

closeCart.addEventListener('click', () => cartModal.style.display = 'none');

// Slider logic (auto + indicators, no arrows)
function updateSlider() {
    document.querySelectorAll('.slide').forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    document.querySelectorAll('.indicator').forEach((ind, index) => {
        ind.classList.toggle('active', index === currentSlide);
    });
}

function changeSlide(n) {
    currentSlide = (currentSlide + n + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateSlider();
}

// Create indicators
const slider = document.querySelector('.slider');
const indicators = document.createElement('div');
indicators.className = 'slider-indicators';
for (let i = 0; i < totalSlides; i++) {
    const ind = document.createElement('div');
    ind.className = 'indicator';
    if (i === 0) ind.classList.add('active');
    ind.onclick = () => {
        currentSlide = i;
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateSlider();
    };
    indicators.appendChild(ind);
}
slider.appendChild(indicators);

// Auto slide
setInterval(() => changeSlide(1), 5000);

// Newsletter demo
document.querySelector('.newsletter-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you for subscribing! (demo)');
});

// Init
updateCartDisplay();
updateSlider();
