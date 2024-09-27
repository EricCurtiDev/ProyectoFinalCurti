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