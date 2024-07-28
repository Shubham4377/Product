function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    cart.forEach(product => {
        const total = product.quantity * product.price;
        subtotal += total;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${product.image}" alt="Product Image" class="product-image">
            <div class="product-details">
                <p class="product-title">${product.title || 'Headly Light Cricket Tennis Ball'}</p>
                <p class="product-price">Rs. ${product.price.toFixed(2)}</p>
                <p class="product-color">Color: ${product.color}</p>
            </div>
            <div class="product-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${product.id}, -1)">-</button>
                <span class="quantity">${product.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${product.id}, 1)">+</button>
                <button class="remove-btn" onclick="removeItem(${product.id})">&#128465;</button>
            </div>
            <div class="product-total">Rs. ${total.toFixed(2)}</div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    document.querySelector('.subtotal').innerText = 'Rs. ' + subtotal.toFixed(2);
}

function updateQuantity(productId, amount) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.id == productId);
    if (productIndex !== -1) {
        cart[productIndex].quantity += amount;
        if (cart[productIndex].quantity < 1) {
            cart[productIndex].quantity = 1;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }
}

function removeItem(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id != productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

document.addEventListener('DOMContentLoaded', loadCart);
