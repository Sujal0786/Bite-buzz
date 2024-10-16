let originalProductList = []; 

window.onload = function() {
    document.getElementById('name').innerText = localStorage.getItem('name') || 'Guest';
    document.getElementById('email').innerText = localStorage.getItem('email') || 'No email available';

    
    const filterLinks = document.querySelectorAll('.filterRight a');
    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            randomizeProducts(); 
        });
    });

   
    renderProducts();
};


function renderProducts() {
    fetch('http://localhost:3000/restaurants')  // Fetch the restaurant data from the server
        .then(response => response.json())
        .then(productList => {
            originalProductList = productList; // Store the fetched products
            displayProducts(originalProductList); // Display the original product list
        })
        .catch(error => console.error('Error fetching restaurant data:', error));
}

// Function to display products in the container
function displayProducts(products) {
    const list = document.getElementById("list-container");
    list.innerHTML = '';  // Clear existing products

    products.forEach((product) => {
        const vidDiv = document.createElement("div");
        vidDiv.className = 'cardDiv';

        vidDiv.innerHTML = `<div class="vid-list" data-name="p-1">
             <img src="${product.src}" class="img-class" alt="Product Image">
             
         <div class="flex-div">
           <div class="vid-info">
             <a href="${product.href}" class="title">${product.name}</a>
             <p>${product.description}</p>
             <p>Desserts, Beverages and more...</p>
             <div class="btns flex-div">
                 <div class="rating"> <span class="fas fa-star">${product.rating}</span> </div> 
                 <div class="time">${product.time}</div> 
                 <div class="amt">RS.${product.amt}</div>
             </div>
             <div class="offers">
             <p>${product.offer}</p>
         </div>
           </div>
         </div>
       </div>`;

        list.appendChild(vidDiv);
    });
}

function randomizeProducts() {
    // Shuffle the original product list
    const shuffledProducts = originalProductList.sort(() => Math.random() - 0.5);
    displayProducts(shuffledProducts); // Render the shuffled products
}

function logout() {
    // Clear user data and redirect to login page
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    window.location.href = "login.html";
}

let searchForm = document.querySelector(".search-form");

document.querySelector("#search-btn").onclick = () => {
    searchForm.classList.toggle("active");
    shoppingCart.classList.remove("active");
    loginForm.classList.remove("active");
    navbar.classList.remove("active");
};

let shoppingCart = document.querySelector(".shopping-cart");

document.querySelector("#cart-btn").onclick = () => {
    shoppingCart.classList.toggle("active");
    searchForm.classList.remove("active");
    loginForm.classList.remove("active");
    navbar.classList.remove("active");
};

let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () => {
    loginForm.classList.toggle('active');
    searchForm.classList.remove("active");
    shoppingCart.classList.remove("active");
    navbar.classList.remove("active");
}

let navbar = document.querySelector(".navbar");

document.querySelector("#menu-btn").onclick = () => {
    navbar.classList.toggle("active");
    searchForm.classList.remove("active");
    shoppingCart.classList.remove("active");
    loginForm.classList.remove("active");
};

const list = document.getElementById("list-container");

let btnAdd = document.querySelector('button');
btnAdd.addEventListener('click', () => {
    btnAdd.innerText = "Go To cart";
});

const cartItemsEl = document.querySelector(".box"); // box
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");

const cartItem = document.getElementById("shopping-cart");

function searchProducts() {
    let input = document.getElementById("search-box").value.toUpperCase(); // Get search input
    let productList = document.getElementById("list-container");
    let cards = productList.getElementsByClassName("cardDiv"); // Select the product cards

    
    for (let i = 0; i < cards.length; i++) {
        let descriptionElement = cards[i].querySelector("a"); // The element that holds the description (first <p> tag in the card)
        let description = descriptionElement ? descriptionElement.innerText.toUpperCase() : ""; // Get description and convert to uppercase

       
        if (description.indexOf(input) > -1) {
            cards[i].style.display = "block";  // Show the card if description matches
        } else {
            cards[i].style.display = "none";   // Hide the card if description doesn't match
        }
    }
}
