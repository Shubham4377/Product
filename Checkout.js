// Function to get URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get('name'),
        price: parseFloat(params.get('price')) || 0,
        image: params.get('image'),
        quantity: parseInt(params.get('quantity'), 10) || 1,
    };
}

// Display product details in order summary
function displayProductSummary() {
    const params = getUrlParams();
    const productSummary = document.getElementById('product-summary');

    productSummary.innerHTML = `
        <div class="product">
            <img src="${params.image}" alt="${params.name}">
            <div class="details">
                <h4>${params.name}</h4>
                <p>Price: Rs. ${params.price.toFixed(2)}</p>
                <p>Quantity: ${params.quantity}</p>
                <p>Total: Rs. ${(params.price * params.quantity).toFixed(2)}</p>
            </div>
        </div>
    `;
}

// Call the function to display product summary on page load
window.onload = displayProductSummary;

function updateCartURLParams() {
    const productName = 'Slazenger Wimbledon Multicolour Tennis Ball'; // Replace with dynamic value
    const productPrice = 525.00; // Replace with dynamic value
    const productImage = 'image/AnyConv.com__8615037-removebg-preview.png'; // Replace with dynamic value
    const productQuantity = parseInt(document.getElementById('product-quantity').value, 10) || 1;

    const urlParams = new URLSearchParams();
    urlParams.set('name', productName);
    urlParams.set('price', productPrice);
    urlParams.set('image', productImage);
    urlParams.set('quantity', productQuantity);

    const checkoutURL = 'checkout.html?' + urlParams.toString();
    window.location.href = checkoutURL;
}

document.getElementById('proceed-to-buy-button').addEventListener('click', updateCartURLParams);


// product buy-now se
