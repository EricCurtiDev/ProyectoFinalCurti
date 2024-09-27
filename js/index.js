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

// Product and Cart functions
function updateProductInfo() {
    const productElements = document.querySelectorAll('.pro');
    productElements.forEach((element, index) => {
        if (index < products.length) {
            const product = products[index];
            element.setAttribute('data-id', product.id);
            element.querySelector('img').src = product.image;
            element.querySelector('img').alt = product.name;
            element.querySelector('.des span').textContent = product.category;
            element.querySelector('.des h5').textContent = product.name;
            element.querySelector('.des h4').textContent = `$${product.price.toFixed(2)}`;
        }
    });
}

function addToCartListeners() {
    document.querySelectorAll(`.${ADD_TO_CART_CLASS}`).forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.pro');
            const productId = parseInt(product.getAttribute('data-id'));
            const name = product.querySelector('.des h5').textContent;
            const price = parseFloat(product.querySelector('.des h4').textContent.replace('$', ''));
            console.log(`User clicked "Add to Cart" for ${name}`);
            addToCart(productId, name, price);
        });
    });
}

//Cart Management Functions
function addToCart(productId, name, price) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
        console.log(`Increased quantity of ${name}. New quantity: ${existingItem.quantity}`);
    } else {
        cart.push({ id: productId, name, price, quantity: 1 });
        console.log(`Added new item to cart: ${name}`);
    }
    cartItemCount++;
    updateCartIcon();
    updateCartDisplay();
    console.log("Current cart:", cart);
    saveCartToLocalStorage();
}

function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        const removedItem = cart[itemIndex];
        cartItemCount -= removedItem.quantity;
        cart.splice(itemIndex, 1);
        console.log(`Removed item from cart: ${removedItem.name}`);
    }
    updateCartDisplay();
    updateCartIcon();
    console.log("Current cart:", cart);
    saveCartToLocalStorage();
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        const oldQuantity = item.quantity;
        const quantityDifference = newQuantity - oldQuantity;
        cartItemCount += quantityDifference;
        item.quantity = parseInt(newQuantity);
        console.log(`Updated quantity of ${item.name} from ${oldQuantity} to ${item.quantity}`);
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
            updateCartIcon();
        }
    }
    console.log("Current cart:", cart);
    saveCartToLocalStorage();
}