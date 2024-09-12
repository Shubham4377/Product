// <----------------------------------------------- Back button functionality --------------------------------------->
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("back").addEventListener("click", function() {
        window.history.back();
    });
});

// <---------------------------------------------------filter item-------------------------------------------------> 
document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product-item');
    const productCount = document.getElementById('product-count');
    const sortSelect = document.getElementById('sort-products');

    function updateProductCount() {
        productCount.textContent = `${products.length} products found`;
    }

    function sortProducts(event) {
        const sortBy = event.target.value;
        const productArray = Array.from(products);

        productArray.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('p').textContent.replace(/[^0-9.-]+/g,""));
            const priceB = parseFloat(b.querySelector('p').textContent.replace(/[^0-9.-]+/g,""));

            if (sortBy === 'price-asc') {
                return priceA - priceB;
            } else if (sortBy === 'price-desc') {
                return priceB - priceA;
            } else {
                return 0;
            }
        });

        const productList = document.querySelector('.product-list');
        productList.innerHTML = '';
        productArray.forEach(product => productList.appendChild(product));
    }

    sortSelect.addEventListener('change', sortProducts);

    updateProductCount();
});
/* ------------------------------------------------------toogle js code--------------------------------------------  */
  
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

/* ------------------------------------------------------toogle code end ------------------------------------------- */

/* ---------------------------------------------------------------search button code--------------------------- */
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    // Example data (replace with actual product data)
    const products = [
        { id: 1, name: "Headly Light Cricket Tennis Ball", price: "520.00", image: "image/balls.png", url: "index.html" },
        { id: 2, name: "Slazenger Wimbledon Multicolour Tennis Ball", price: "525.00", image: "image/AnyConv.com__8615037-removebg-preview.png", url: "./slazenger.html" },
        { id: 3, name: "TENNEX Cricket Tennis Ball Yellow Heavy", price: "540.00", image: "image/cricket_tenis_ball-removebg-preview.png", url: "./Tennex1.html" },
        { id: 4, name: "DSC Krunch 2.0 English Willow Cricket Bat", price: "20,960", image: "image/krunch-5-0-english-willow-cricket-bat-1_1fea8fe4-da2a-4e87-89b0-e8e02d080c69_713x-removebg-preview.png", url: "./Dsc.html" },
        { id: 5, name: "Cosco Rubber Tennis Ball (Multicolour) Standard Size", price: "375.00", image: "image/71_lOJcSzUL._SX569__1_-removebg-preview.png", url: "./cosco.html" },
        { id: 6, name: "Nivia Heavy Tennis Ball Cricket Ball (Pack of 12)", price: "1,056.00", image: "image/AnyConv.com__8623802-removebg-preview.png", url: "./Nivia.html" },
        { id: 7, name: "Dunlop Fort All Court Tennis Ball (Green) 1 Can | 3 Balls", price: "825.00", image: "image/AnyConv.com__8607415-removebg-preview.png", url: "./Dunloop.html" },
        { id: 8, name: "GRASSHOPPER Clubman Cricket Leather Ball", price: "810.00", image: "image/6286823-removebg-preview.png", url: "./grasshopper.html" },
        { id: 9, name: "Sg Club Leather White Cricket Ball", price: "949.00", image: "image/5734016-removebg-preview.png", url: "product1.html" },
        { id: 10, name: "Grasshopper True League Cricket  Ball", price: "595.00", image: "image/5733992-removebg-preview.png", url: "product2.html" },
        { id: 11, name: "Competent Leather Cricket Ball White", price: "215.00", image: "image/6106534-removebg-preview.png", url: "product3.html" },
        { id: 12, name: "Sg Club Leather Cricket Season Ball", price: "799.00", image: "image/5734010-removebg-preview.png", url: "product4.html" },
        { id: 13, name: "Dsc Condor Winger English Willow Cricket Bat", price: "2,699.00", image: "image/DSC-Condor-Winger-English-Willow-Cricket-Bat-2-600x600_600x-removebg-preview.png", url: "product5.html" },
        // Add more products as needed
    ];

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        const searchTerm = searchInput.value.toLowerCase().trim();

        // Filter products based on search term
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );

        // Display search results
        if (filteredProducts.length > 0) {
            const resultsHTML = filteredProducts.map(product => `
                <a href="${product.url}" class="search-result">
                    <img src="${product.image}" alt="${product.name}">
                    <p>${product.name}</p>
                    <h6>Rs. ${product.price}</h6>
                </a>
            `).join('');
            searchResults.innerHTML = resultsHTML;
            searchResults.classList.add('visible'); // Show search results container
        } else {
            searchResults.innerHTML = '<p>No results found.</p>';
            searchResults.classList.remove('visible'); // Hide search results container if no results
        }
    });

    // Optional: Close search results when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = searchForm.contains(event.target);
        if (!isClickInside) {
            searchResults.classList.remove('visible');
        }
    });
});


/* ------------------------------------------------------search code end ------------------------------------------- */

/* ---------------------------------------------------- card item ke andar ka code start ----------------------------- */

// document.addEventListener('DOMContentLoaded', () => {
//     const cart = [];
//     const cartIcon = document.getElementById('cart-icon');
//     const cartItems = document.getElementById('cart-items');
//     const cartList = document.getElementById('cart-list');
//     const cartTotal = document.getElementById('cart-total');
//     const cartCount = document.getElementById('cart-count');

//     function updateCart() {
//         cartList.innerHTML = '';
//         let total = 0;
//         cart.forEach((item, index) => {
//             total += item.price * item.quantity;
//             const li = document.createElement('li');
//             li.classList.add('cart-item');
//             li.innerHTML = `
//                 <img src="${item.image}" alt="${item.name}" class="cart-item-img">
//                 <div class="cart-item-info">
//                     <p>${item.name} - Rs. ${item.price} x ${item.quantity}</p>
//                 </div>
//             `;
//             cartList.appendChild(li);
//         });
//         cartTotal.innerText = total;
//         cartCount.innerText = cart.length;
//     }

//     document.querySelectorAll('.add-to-cart').forEach((button) => {
//         button.addEventListener('click', () => {
//             const productItem = button.closest('.product-item');
//             const name = productItem.querySelector('h3').innerText;
//             const price = parseFloat(productItem.querySelector('p').innerText.replace('Rs. ', '').replace('.00', ''));
//             const image = productItem.querySelector('img').src;
//             const existingProduct = cart.find(item => item.name === name);

//             if (existingProduct) {
//                 existingProduct.quantity += 1;
//             } else {
//                 cart.push({ name, price, quantity: 1, image });
//             }

//             updateCart();
//         });
//     });

//     cartIcon.addEventListener('click', () => {
//         cartItems.classList.toggle('show');
//     });
// });

// document.addEventListener('DOMContentLoaded', () => {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const cartIcon = document.getElementById('cart-icon');
//     const cartItems = document.getElementById('cart-items');
//     const cartList = document.getElementById('cart-list');
//     const cartTotal = document.getElementById('cart-total');
//     const cartCount = document.getElementById('cart-count');

//     function updateCart() {
//         cartList.innerHTML = '';
//         let total = 0;
//         cart.forEach((item, index) => {
//             total += item.price * item.quantity;
//             const li = document.createElement('li');
//             li.classList.add('cart-item');
//             li.innerHTML = `
//                 <img src="${item.image}" alt="${item.name}" class="cart-item-img">
//                 <div class="cart-item-info">
//                     <p>${item.name} - Rs. ${item.price} x ${item.quantity}</p>
//                 </div>
//                 <button class="remove-from-cart" data-index="${index}">Remove</button>
//             `;
//             cartList.appendChild(li);
//         });
//         cartTotal.innerText = total.toFixed(2);
//         cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);

//         // Save the cart to localStorage
//         localStorage.setItem('cart', JSON.stringify(cart));

//         // Add event listeners for the remove buttons
//         document.querySelectorAll('.remove-from-cart').forEach(button => {
//             button.addEventListener('click', () => {
//                 const index = button.getAttribute('data-index');
//                 cart.splice(index, 1);
//                 updateCart();
//             });
//         });
//     }

//     document.querySelectorAll('.add-to-cart').forEach((button) => {
//         button.addEventListener('click', () => {
//             const productItem = button.closest('.product-item');
//             const name = productItem.querySelector('h3').innerText;
//             const price = parseFloat(productItem.querySelector('p').innerText.replace('Rs. ', '').replace('.00', ''));
//             const image = productItem.querySelector('img').src;
//             const existingProduct = cart.find(item => item.name === name);

//             if (existingProduct) {
//                 existingProduct.quantity += 1;
//             } else {
//                 cart.push({ name, price, quantity: 1, image });
//             }

//             updateCart();
//         });
//     });

//     cartIcon.addEventListener('click', () => {
//         cartItems.classList.toggle('show');
//     });

//     // Load the cart from localStorage on page load
//     updateCart();
// });
/* ---------------------------------------------------- card item ke andar ka code end  ----------------------------- */

// document.addEventListener('DOMContentLoaded', () => {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const cartIcon = document.getElementById('cart-icon');
//     const cartItems = document.getElementById('cart-items');
//     const cartList = document.getElementById('cart-list');
//     const cartTotal = document.getElementById('cart-total');
//     const cartCount = document.getElementById('cart-count');
//     const checkoutButton = document.getElementById('checkout-button'); // Checkout button

//     function updateCart() {
//         cartList.innerHTML = '';
//         let total = 0;
//         cart.forEach((item, index) => {
//             total += item.price * item.quantity;
//             const li = document.createElement('li');
//             li.classList.add('cart-item');
//             li.innerHTML = `
//                 <img src="${item.image}" alt="${item.name}" class="cart-item-img">
//                 <div class="cart-item-info">
//                     <p>${item.name} - Rs. ${item.price} x ${item.quantity}</p>
//                 </div>
//                 <button class="remove-from-cart" data-index="${index}">Remove</button>
//             `;
//             cartList.appendChild(li);
//         });
//         cartTotal.innerText = total.toFixed(2);
//         cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);

//         // Save the cart to localStorage
//         localStorage.setItem('cart', JSON.stringify(cart));

//         // Add event listeners for the remove buttons
//         document.querySelectorAll('.remove-from-cart').forEach(button => {
//             button.addEventListener('click', () => {
//                 const index = button.getAttribute('data-index');
//                 cart.splice(index, 1);
//                 updateCart();
//             });
//         });
//     }

//     document.querySelectorAll('.add-to-cart').forEach((button) => {
//         button.addEventListener('click', () => {
//             const productItem = button.closest('.product-item');
//             const name = productItem.querySelector('h3').innerText;
//             const price = parseFloat(productItem.querySelector('p').innerText.replace('Rs. ', '').replace('.00', ''));
//             const image = productItem.querySelector('img').src;
//             const existingProduct = cart.find(item => item.name === name);

//             if (existingProduct) {
//                 existingProduct.quantity += 1;
//             } else {
//                 cart.push({ name, price, quantity: 1, image });
//             }

//             updateCart();
//         });
//     });

//     cartIcon.addEventListener('click', () => {
//         cartItems.classList.toggle('show');
//     });

//     checkoutButton.addEventListener('click', () => {
//         let message = "Order Details:\n";
//         let total = 0;

//         cart.forEach((item) => {
//             message += `${item.name} - Rs. ${item.price} x ${item.quantity} = Rs. ${(item.price * item.quantity).toFixed(2)}\n`;
//             total += item.price * item.quantity;
//         });

//         message += `\nTotal: Rs. ${total.toFixed(2)}\n`;
//         message += `Note: Please deliver the products to the specified address.\n`; // Custom note
//         message += `Address: [Enter Your Address Here]\n`; // User address placeholder
//         message += `\nThank you for shopping with us!`;

//         const whatsappURL = `https://wa.me/9335648890?text=${encodeURIComponent(message)}`;
//         window.open(whatsappURL, '_blank');
//     });

//     // Load the cart from localStorage on page load
//     updateCart();
// });


document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartIcon = document.getElementById('cart-icon');
    const cartItems = document.getElementById('cart-items');
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const checkoutButton = document.getElementById('checkout-button');
    const userAddress = document.getElementById('user-address'); // User address input
    const userNote = document.getElementById('user-note'); // User note input

    function updateCart() {
        cartList.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const li = document.createElement('li');
            li.classList.add('cart-item');
            li.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <p>${item.name} - Rs. ${item.price} x ${item.quantity}</p>
                </div>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            `;
            cartList.appendChild(li);
        });
        cartTotal.innerText = total.toFixed(2);
        cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);

        // Save the cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Add event listeners for the remove buttons
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    document.querySelectorAll('.add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            const productItem = button.closest('.product-item');
            const name = productItem.querySelector('h3').innerText;
            const price = parseFloat(productItem.querySelector('p').innerText.replace('Rs. ', '').replace('.00', ''));
            const image = productItem.querySelector('img').src;
            const existingProduct = cart.find(item => item.name === name);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1, image });
            }

            updateCart();
        });
    });

    cartIcon.addEventListener('click', () => {
        cartItems.classList.toggle('show');
    });

    checkoutButton.addEventListener('click', () => {
        let message = "Order Details:\n";
        let total = 0;

        cart.forEach((item) => {
            message += `${item.name} - Rs. ${item.price} x ${item.quantity} = Rs. ${(item.price * item.quantity).toFixed(2)}\n`;
            total += item.price * item.quantity;
        });

        message += `\nTotal: Rs. ${total.toFixed(2)}\n`;

        // Get the user's address and note
        const address = userAddress.value.trim();
        const note = userNote.value.trim();

        if (address) {
            message += `Address: ${address}\n`;
        } else {
            message += `Address: [Not provided]\n`; // Default message if no address
        }

        if (note) {
            message += `Note: ${note}\n`;
        }

        message += `\nThank you for shopping with us!`;

        const whatsappURL = `https://wa.me/9335648890?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    });

    // Load the cart from localStorage on page load
    updateCart();
});
/*------------------------------- proced to buy ------------------------------ */

// document.addEventListener('DOMContentLoaded', () => {
//     const proceedToBuyButton = document.getElementById('proceed-to-buy-button');
//     const cartItems = document.getElementById('cart-items');
//     const cartList = document.getElementById('cart-list');
//     const userAddress = document.getElementById('user-address').value;
//     const userNote = document.getElementById('user-note').value;
    
//     proceedToBuyButton.addEventListener('click', () => {
//         let productDetails = [];

//         // Iterate over each item in the cart and collect details
//         const cartItems = cartList.querySelectorAll('li');
//         cartItems.forEach(item => {
//             const title = item.querySelector('h3').innerText;
//             const price = item.querySelector('.price').innerText;
//             const quantity = item.querySelector('.quantity').innerText;
//             const totalPrice = item.querySelector('.total-price').innerText;

//             productDetails.push({
//                 title,
//                 price,
//                 quantity,
//                 totalPrice
//             });
//         });

//         // Save the cart details and user inputs to localStorage
//         localStorage.setItem('productDetails', JSON.stringify(productDetails));
//         localStorage.setItem('userAddress', userAddress);
//         localStorage.setItem('userNote', userNote);

//         // Redirect to the checkout page
//         window.location.href = 'checkout.html';
//     });
// });



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
