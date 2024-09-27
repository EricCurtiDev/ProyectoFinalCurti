//Constants
const CART_ICON_SELECTOR = '#cart-icon i';
const CART_MODAL_ID = 'cart-modal';
const CART_ITEMS_ID = 'cart-items';
const CART_TOTAL_ID = 'cart-total';
const CHECKOUT_BTN_ID = 'checkout-btn';
const ADD_TO_CART_CLASS = 'add-to-cart';

//State
let cart = [];
let products = [];
let cartItemCount = 0;

//DOM Elements
const modal = document.getElementById(CART_MODAL_ID);
const cartIcon = document.getElementById('cart-icon');
const closeBtn = document.getElementsByClassName('close')[0];

//Initialization
function init() {
    fetchProducts();
    addEventListeners();
    loadCartFromLocalStorage();
    updateCartIcon();
    console.log("Shopping cart initialized");
}

//Fetch products from json file
function fetchProducts() {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data; // Changed this line
            updateProductInfo();
            addToCartListeners();
        })
        .catch(error => console.error('Error loading products:', error));
}

//Event listeners
function addEventListeners() {
    cartIcon.onclick = openModal;
    closeBtn.onclick = closeModal;
    window.onclick = (event) => {
        if (event.target == modal) closeModal();
    };
    document.getElementById(CHECKOUT_BTN_ID).addEventListener('click', checkout);
}

// Modal functions
function openModal() {
    modal.style.display = "block";
    updateCartDisplay();
    console.log("Cart opened. Current items:", cart);
}

function closeModal() {
    modal.style.display = "none";
    console.log("Cart closed");
}