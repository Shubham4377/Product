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
