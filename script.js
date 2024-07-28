// <----------------------------------------------- image clickable code--------------------------------------->
function clk(img) {
    // Get the main image element
    const mainImg = document.getElementById("imgs");
    // Change the src attribute to the clicked image's src
    mainImg.src = img.src;
}

// left image ko clickable banane ke liye 

document.addEventListener("DOMContentLoaded", function() {
    const clickableImages = document.querySelectorAll(".clickable-image");

    clickableImages.forEach(image => {
        image.addEventListener("click", function() {
            const url = this.getAttribute("data-url");
            window.location.href = url;
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const addToCartButton = document.getElementById('add-to-cart');
    const buyNowButton = document.getElementById('buy-now');
    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartList = document.getElementById('cart-list');
    const checkoutButton = document.getElementById('checkout-button');
    const proceedToBuyButton = document.getElementById('proceed-to-buy-button');
    const increaseQuantityButton = document.getElementById('increase-quantity');
    const decreaseQuantityButton = document.getElementById('decrease-quantity');
    const productQuantityInput = document.getElementById('product-quantity');
    const cartTotal = document.getElementById('cart-total');
    const addressInput = document.getElementById('address');
    const noteTextarea = document.getElementById('note');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    increaseQuantityButton.addEventListener('click', function() {
        productQuantityInput.value = parseInt(productQuantityInput.value) + 1;
    });

    decreaseQuantityButton.addEventListener('click', function() {
        if (parseInt(productQuantityInput.value) > 1) {
            productQuantityInput.value = parseInt(productQuantityInput.value) - 1;
        }
    });

    addToCartButton.addEventListener('click', function() {
        const productElement = this.closest('.product'); // Use closest to find the parent with class "product"
        const productId = productElement.getAttribute('data-id');
        const productName = productElement.getAttribute('data-name');
        const productPrice = productElement.getAttribute('data-price');
        const productImage = productElement.getAttribute('data-image'); // Add product image attribute
        const productQuantity = parseInt(productQuantityInput.value);
        const product = { id: productId, name: productName, price: parseFloat(productPrice), image: productImage, quantity: productQuantity };

        const existingProductIndex = cart.findIndex(item => item.id === productId);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += productQuantity;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartItems();
    });

    cartIcon.addEventListener('click', function() {
        cartItems.classList.toggle('open');
    });

    function updateCartCount() {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    function updateCartItems() {
        cartList.innerHTML = '';
        let totalAmount = 0;

        cart.forEach((product, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="cart-item-image"/>
                ${product.name} - Rs. ${product.price} x ${product.quantity}
                <div class="cart-item-controls">
                    <button class="increase-quantity">+</button>
                    <span>${product.quantity}</span>
                    <button class="decrease-quantity">-</button>
                    <button class="remove-item">Remove</button>
                </div>
            `;

            li.querySelector('.increase-quantity').addEventListener('click', function() {
                product.quantity += 1;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                updateCartItems();
            });

            li.querySelector('.decrease-quantity').addEventListener('click', function() {
                if (product.quantity > 1) {
                    product.quantity -= 1;
                } else {
                    cart.splice(index, 1);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                updateCartItems();
            });

            li.querySelector('.remove-item').addEventListener('click', function() {
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                updateCartItems();
            });

            cartList.appendChild(li);
            totalAmount += product.price * product.quantity;
        });

        cartTotal.textContent = totalAmount.toFixed(2);
        toggleCheckoutButtons();
    }

    function toggleCheckoutButtons() {
        const isCartEmpty = cart.length === 0;
        checkoutButton.style.display = isCartEmpty ? 'none' : 'block';
        proceedToBuyButton.style.display = isCartEmpty ? 'none' : 'block';
    }

    updateCartCount();
    updateCartItems();

    checkoutButton.addEventListener('click', redirectToWhatsApp);
    proceedToBuyButton.addEventListener('click', function() {
        alert('Proceed to buy functionality not implemented yet.');
        // Implement your custom action for "Proceed to Buy" here
    });

    function generateMessage(cartItems, address, note) {
        let message = 'Hello, I would like to order the following items:\n';
        cartItems.forEach(item => {
            message += `- ${item.name} (Quantity: ${item.quantity}, Price: Rs. ${item.price})\n`;
        });
        message += `\nTotal Amount: Rs. ${cartTotal.textContent}\nAddress: ${address}\nNote: ${note}\nThank you!`;
        return encodeURIComponent(message);
    }

    function redirectToWhatsApp() {
        const phoneNumber = 'YOUR_PHONE_NUMBER'; // Replace with your phone number
        const message = generateMessage(cart, addressInput.value, noteTextarea.value);
        const whatsappURL = `https://wa.me/${9335648890}?text=${message}`;
        window.location.href = whatsappURL;
    }
});

// <----------------------------------------------- Buy now button alert--------------------------------------->
document.addEventListener('DOMContentLoaded', () => {
    const buyNowButton = document.getElementById('buy-now');

    buyNowButton.addEventListener('click', () => {
        alert('Thank you for your purchase!');
    });
});

// <----------------------------------------------- Back button functionality --------------------------------------->
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("back").addEventListener("click", function() {
        window.history.back();
    });
});

// <----------------------------------------------- Proceed to Buy Button Redirect --------------------------------------->
document.getElementById('proceed-to-buy-button').addEventListener('click', function() {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length > 0) {
        var queryParams = cart.map(product => {
            return 'id=' + encodeURIComponent(product.id) +
                   '&name=' + encodeURIComponent(product.name) +
                   '&price=' + encodeURIComponent(product.price) +
                   '&image=' + encodeURIComponent(product.image) +
                   '&quantity=' + encodeURIComponent(product.quantity);
        }).join('&');

        var checkoutUrl = 'checkout.html?' + queryParams;
        window.location.href = checkoutUrl;
    } else {
        alert('Your cart is empty!');
    }
});


addToCartButton.addEventListener('click', function() {
    const productElements = document.querySelectorAll('.product');
    productElements.forEach(productElement => {
        const productId = productElement.getAttribute('data-id');
        const productName = productElement.getAttribute('data-name');
        const productPrice = productElement.getAttribute('data-price');
        const productImage = productElement.getAttribute('data-image');
        const productQuantity = parseInt(productQuantityInput.value);
        const product = { id: productId, name: productName, price: parseFloat(productPrice), image: productImage, quantity: productQuantity };

        const existingProductIndex = cart.findIndex(item => item.id === productId);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += productQuantity;
        } else {
            cart.push(product);
        }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartItems();
});


document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('#add-to-cart');

    addToCartButtons.forEach(addToCartButton => {
        addToCartButton.addEventListener('click', function() {
            const productElement = this.closest('.product');
            const productId = productElement.getAttribute('data-id');
            const productName = productElement.getAttribute('data-name');
            const productPrice = productElement.getAttribute('data-price');
            const productImage = productElement.getAttribute('data-image');
            const productQuantity = parseInt(productQuantityInput.value);
            const product = { id: productId, name: productName, price: parseFloat(productPrice), image: productImage, quantity: productQuantity };

            const existingProductIndex = cart.findIndex(item => item.id === productId);
            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += productQuantity;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            updateCartItems();
        });
    });
});

// ------------------------------------- toggle javascript code-------------------------------------------------------------- 

document.addEventListener('DOMContentLoaded', function () {
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    const featureContents = document.querySelectorAll('.feature .content');

    modeToggle.addEventListener('change', function () {
        body.classList.toggle('dark-mode');

        const paragraphs = document.querySelectorAll('.feature .content p');
        const headings = document.querySelectorAll('.feature .content h6');

        paragraphs.forEach(function (paragraph) {
            if (modeToggle.checked) {
                paragraph.style.color = 'white';
            } else {
                paragraph.style.color = ''; // revert to default
            }
        });

        headings.forEach(function (heading) {
            if (modeToggle.checked) {
                heading.style.color = 'white';
            } else {
                heading.style.color = ''; // revert to default
            }
        });

        featureContents.forEach(function (content) {
            if (modeToggle.checked) {
                content.classList.add('dark-mode');
            } else {
                content.classList.remove('dark-mode');
            }
        });
    });
});


//--------------------------------------------------------------------------search button javascript code---------------------------------------------------//

// document.addEventListener('DOMContentLoaded', function () {
//     const searchForm = document.getElementById('search-form');
//     const searchInput = document.getElementById('search-input');
//     const products = document.querySelectorAll('.product');

//     searchForm.addEventListener('submit', function (event) {
//         event.preventDefault();
//         const searchQuery = searchInput.value.toLowerCase();
//         products.forEach(product => {
//             const productName = product.getAttribute('data-name').toLowerCase();
//             if (productName.includes(searchQuery)) {
//                 product.style.display = 'block';
//             } else {
//                 product.style.display = 'none';
//             }
//         });
//     });
// });

// // script.js

// // Product data for searching
// const products = [
//     { id: 1, name: "Headly Light Cricket Tennis Ball", price: 520, image: "image/balls.png" },
//     { id: 2, name: "SG Tournament Stumps", price: 450, image: "image/stump.png" },
//     { id: 3, name: "MRF Genius Chase Master", price: 4000, image: "image/bat.png" },
//     { id: 4, name: "SG Cricket Kit Bag", price: 4500, image: "image/kit.png" }
// ];

// // Function to handle search
// function handleSearch(event) {
//     event.preventDefault();
//     const query = document.getElementById('search-input').value.toLowerCase();
//     const gallery = document.querySelector('.gallery');
//     gallery.innerHTML = '';

//     const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));

//     filteredProducts.forEach(product => {
//         const galleryItem = document.createElement('div');
//         galleryItem.className = 'gallery-item';
//         galleryItem.innerHTML = `
//             <img src="${product.image}" alt="${product.name}">
//             <div class="content">
//                 <p><b>${product.name}</b></p>
//                 <h6>Rs. ${product.price}.00</h6>
//             </div>
//         `;
//         gallery.appendChild(galleryItem);
//     });
// }

// document.getElementById('search-form').addEventListener('submit', handleSearch);

// // Toggle dark mode
// document.getElementById('mode-toggle').addEventListener('change', (event) => {
//     document.body.classList.toggle('dark-mode', event.target.checked);
// });

// script.js

// document.addEventListener('DOMContentLoaded', function () {
//     const searchForm = document.getElementById('search-form');
//     const searchInput = document.getElementById('search-input');
//     const products = document.querySelectorAll('.product');

//     searchForm.addEventListener('submit', function (event) {
//         event.preventDefault();
//         const searchQuery = searchInput.value.toLowerCase();
//         products.forEach(product => {
//             const productName = product.getAttribute('data-name').toLowerCase();
//             if (productName.includes(searchQuery)) {
//                 product.style.display = 'block';
//             } else {
//                 product.style.display = 'none';
//             }
//         });
//     });

//     // Toggle dark mode
//     document.getElementById('mode-toggle').addEventListener('change', (event) => {
//         document.body.classList.toggle('dark-mode', event.target.checked);
//     });
// });


// document.addEventListener("DOMContentLoaded", function() {
//     const searchForm = document.getElementById("search-form");
//     const searchInput = document.getElementById("search-input");
//     const searchResults = document.getElementById("search-results");

//     searchForm.addEventListener("submit", function(event) {
//         event.preventDefault();
//         const query = searchInput.value.toLowerCase();

//         const products = [
//             {
//                 id: 1,
//                 name: "Headly Light Cricket Tennis Ball",
//                 image: "image/balls.png",
//                 price: 520.00
//             },
//             // Add more products as needed
//         ];

//         const results = products.filter(product => product.name.toLowerCase().includes(query));

//         searchResults.innerHTML = "";
//         results.forEach(product => {
//             const item = document.createElement("div");
//             item.className = "search-result-item";
//             item.innerHTML = `
//                 <img src="${product.image}" alt="${product.name}">
//                 <span>${product.name} - Rs.${product.price}</span>
//             `;
//             item.addEventListener("click", () => {
//                 // Redirect to a new page with product details
//                 window.location.href = `product.html?id=${product.id}`;
//             });
//             searchResults.appendChild(item);
//         });
//     });
// });



