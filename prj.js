// Ensure that the content is updated after the page is loaded
window.onload = function() {
    document.getElementById('name').innerText = localStorage.getItem('name') || 'Guest';
    document.getElementById('email').innerText = localStorage.getItem('email') || 'No email available';

    const filterLinks = document.querySelectorAll('.filterRight a');
    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            randomizeProducts();
        });
    });

    // Get the restaurant name from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    restaurantName = urlParams.get('restaurant'); // Make restaurantName accessible globally

    // Call the function to display products after the page is loaded
    if (restaurantName) {
        renderProducts(restaurantName);
    } else {
        // Default action if no restaurant is specified
        document.getElementById("list-container").innerHTML = "<p>No restaurant selected.</p>";
    }
};

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
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector(".navbar");

document.querySelector("#menu-btn").onclick = () => {
    navbar.classList.toggle("active");
    searchForm.classList.remove("active");
    shoppingCart.classList.remove("active");
    loginForm.classList.remove("active");
};

window.onscroll = () => {
    searchForm.classList.remove("active");
    shoppingCart.classList.remove("active");
    loginForm.classList.remove("active");
    navbar.classList.remove("active");
};

const list = document.getElementById("list-container");

// Define product lists for each restaurant
const restaurantProducts = {
    Lapinoz: [
        {
            id: 1,
            src: "https://i.pinimg.com/564x/d0/86/8e/d0868e756f4d113a60c1ed5487590d0b.jpg",
            hotelName: "Lapinoz - Pizza",
            description: "Margherita, Fresh Basil, Mozzarella",
            rating: "4.8",
            time: "20Min",
            amt: "350",
            offer: "15% Off | Use PIZZA15",
        },
    
        {
            id: 2,
            src: "https://i.pinimg.com/564x/84/5e/9e/845e9ecfd60acc42ad0a7019c0f001f2.jpg",
            hotelName: "Lapinoz - Pizza",
            description: "Meat Lover's, Pepperoni, Sausage, Bacon",
            rating: "4.7",
            time: "25Min",
            amt: "400",
            offer: "20% Off | Use MEATLOVER20",
        },
    
        {
            id: 3,
            src: "https://i.pinimg.com/736x/b0/96/23/b09623357dd96f64242e391b00fae7fe.jpg",
            hotelName: "Lapinoz - Pizza",
            description: "Veggie Delight, Mushrooms, Onions, Bell Peppers",
            rating: "4.6",
            time: "22Min",
            amt: "380",
            offer: "10% Off | Use VEGGIE10",
        },
    
        {
            id: 4,
            src: "https://i.pinimg.com/564x/cf/99/33/cf99337925528f1132212ce4ac440728.jpg",
            hotelName: "Lapinoz - Pizza",
            description: "BBQ Chicken, Red Onion, Cilantro",
            rating: "4.9",
            time: "30Min",
            amt: "600",
            offer: "20% Off | Use BBQ20",
        },
    
        {
            id: 5,
            src: "https://i.pinimg.com/564x/f5/90/d6/f590d6d8be8d29ce06495ba0f1b17c84.jpg",
            hotelName: "Lapinoz - Pizza",
            description: "Four Cheese, Mozzarella, Parmesan, Gouda, Ricotta",
            rating: "4.5",
            time: "18Min",
            amt: "320",
            offer: "15% Off | Use CHEESE15",
        },
    
        {
            id: 6,
            src: "https://i.pinimg.com/736x/d7/37/76/d73776813e32ab1a957ed68b4dbfd0c1.jpg",
            hotelName: "Lapinoz - Pizza",
            description: "Hawaiian, Ham, Pineapple",
            rating: "4.7",
            time: "20Min",
            amt: "340",
            offer: "25% Off | Use HAWAIIAN25",
        },
    
        {
            id: 7,
            src: "https://i.pinimg.com/564x/6c/b2/bd/6cb2bdfa638c6fad49bea59f33624c6f.jpg",
            hotelName: "Lapinoz - Pizza",
            description: "Greek, Feta, Olives, Sun-dried Tomatoes",
            rating: "4.6",
            time: "15Min",
            amt: "300",
            offer: "20% Off | Use GREEK20",
        },
    
        {
            id: 8,
            src: "https://i.pinimg.com/564x/ac/81/e8/ac81e85a30da82f86edc05d908ae3493.jpg",
            hotelName: "Lapinoz - Pizza",
            description: "Pepperoni, Sausage, Mushrooms",
            rating: "4.5",
            time: "12Min",
            amt: "250",
            offer: "10% Off | Use PEPPERONI10",
        },
        {
            id: 9,
            src: "https://i.pinimg.com/564x/77/c8/98/77c8987dc432f3215899f51e89a1ffbb.jpg",
            hotelName: "Lapinoz - Pizza",
            description: "Shrimp Scampi, Garlic, Parsley",
            rating: "4.7",
            time: "22Min",
            amt: "370",
            offer: "15% Off | Use SHRIMP15",
        },
        { 
            id: 10, 
            src: "https://i.pinimg.com/564x/3d/ad/52/3dad52ed586d9a59bd291f93597712f5.jpg", 
            hotelName: "Lapinoz - Pizza", 
            description: "Meatball, Marinara, Mozzarella", 
            rating: "4.8", 
            time: "18Min", 
            amt: "280", 
            offer: "10% Off | Use MEATBALL10",
         },
    
        { 
            id: 11, 
            src:"https://i.pinimg.com/564x/e6/79/14/e679148ee6e9e26f4488f6b75719ff9a.jpg", 
            hotelName: "Lapinoz - Pizza", 
            description: "Italian Sausage, Peppers, Onions",
             rating: "4.6", 
             time: "20Min", 
             amt: "350", 
             offer: "20% Off | Use SAUSAGE20", 
            },
    
        { 
            id: 12, 
            src: "https://i.pinimg.com/564x/eb/3e/ce/eb3ece14bd6522dba35064d9d1a3fc36.jpg", 
            hotelName: "Lapinoz - Pizza", 
            description: "Chicken Bacon Ranch, Bacon, Ranch Dressing", 
            rating: "4.7", 
            time: "22Min", 
            amt: "360",
            offer: "25% Off | Use RANCH25", 
        },
    ],
    ChineseWOK: [
        {
            id: 1,
            src: "https://i.pinimg.com/564x/9b/5c/68/9b5c68b1c0dd623ebf8da5fba24beb9a.jpg",
            hotelName: "Chinese WOK",
            description: "Dim Sum, Spring Rolls, Tea",
            rating: "4.8",
            time: "20Min",
            amt: "350",
            offer: "15% Off | Use DIMSUM15",
          },
        
          {
            id: 2,
            src: "https://i.pinimg.com/564x/a9/6d/8d/a96d8d3767d8cfa37cf8c09f8beaa45c.jpg",
            hotelName: "Chinese WOK",
            description: "Sweet and Sour Pork, Rice, Soup",
            rating: "4.7",
            time: "25Min",
            amt: "400",
            offer: "20% Off | Use SWEET20",
          },
        
          {
            id: 3,
            src: "https://i.pinimg.com/736x/9b/6d/7e/9b6d7e21bd76ad4ebf11c852ae052f1a.jpg",
            hotelName: "Chinese WOK",
            description: "Kung Pao Chicken, Rice, Drink",
            rating: "4.6",
            time: "22Min",
            amt: "380",
            offer: "10% Off | Use KUNGP10",
          },
        
          {
            id: 4,
            src: "https://i.pinimg.com/564x/19/0d/0a/190d0a00a444ec6b156a6abef74ab142.jpg",
            hotelName: "Chinese WOK",
            description: "Peking Duck, Pancakes, Sauce",
            rating: "4.9",
            time: "30Min",
            amt: "600",
            offer: "20% Off | Use PEKING20",
          },
        
          {
            id: 5,
            src: "https://i.pinimg.com/564x/0c/ea/3e/0cea3e13a286aa7d2bc799bcf9d0dcc2.jpg",
            hotelName: "Chinese WOK",
            description: "Mapo Tofu, Rice, Soup",
            rating: "4.5",
            time: "18Min",
            amt: "320",
            offer: "15% Off | Use TOFU15",
          },
        
          {
            id: 6,
            src: "https://i.pinimg.com/564x/c2/71/76/c27176f8784e5669570d8c5bc69898fd.jpg",
            hotelName: "Chinese WOK",
            description: "Chow Mein, Spring Rolls, Drink",
            rating: "4.7",
            time: "20Min",
            amt: "340",
            offer: "25% Off | Use MEIN25",
          },
        
          {
            id: 7,
            src: "https://i.pinimg.com/736x/e1/2a/6b/e12a6bb5bfb54a030a2f3de32a306d2c.jpg",
            hotelName: "Chinese WOK",
            description: "Egg Fried Rice, Dumplings, Tea",
            rating: "4.6",
            time: "15Min",
            amt: "300",
            offer: "20% Off | Use EGGFRIED20",
          },
        
          {
            id: 8,
            src: "https://i.pinimg.com/564x/2f/a3/24/2fa3249d8c7770d6af08fabe4166efa4.jpg",
            hotelName: "Chinese WOK",
            description: "Hot and Sour Soup, Spring Rolls",
            rating: "4.5",
            time: "12Min",
            amt: "250",
            offer: "10% Off | Use SOUP10",
          },
        
          {
            id: 9,
            src: "https://i.pinimg.com/564x/7e/c3/70/7ec3706fa401e923b7a153d435abb01b.jpg",
            hotelName: "Chinese WOK",
            description: "Orange Chicken, Rice, Soup",
            rating: "4.7",
            time: "22Min",
            amt: "370",
            offer: "15% Off | Use ORANGE15",
          },
        
          {
            id: 10,
            src: "https://i.pinimg.com/736x/6d/a7/9c/6da79cc87fb44473811d6d5954b93fbb.jpg",
            hotelName: "Chinese WOK",
            description: "Fried Dumplings, Rice, Drink",
            rating: "4.8",
            time: "18Min",
            amt: "280",
            offer: "10% Off | Use DUMPLING10",
          },
        
          {
            id: 11,
            src: "https://i.pinimg.com/564x/9d/a4/5b/9da45bcb44dcfe2a9f6bc984ab9db24d.jpg",
            hotelName: "Chinese WOK",
            description: "Beef with Broccoli, Rice, Soup",
            rating: "4.6",
            time: "20Min",
            amt: "350",
            offer: "20% Off | Use BEEF20",
          },
        
          {
            id: 12,
            src: "https://i.pinimg.com/564x/3b/8d/af/3b8daf15e6654b556a2b77ea6e2726b7.jpg",
            hotelName: "Chinese WOK",
            description: "Sesame Chicken, Rice, Drink",
            rating: "4.7",
            time: "22Min",
            amt: "360",
            offer: "25% Off | Use SESAME25",
          },
        
    ],
    BelgianWaffle: [
        { 
            id: 1, 
            src: "https://i.pinimg.com/736x/14/49/57/1449576d24b22cdadd16e2ce97d306bf.jpg", 
            hotelName: "The Belgian-Waffle", 
            description: "Fresh Fruit Waffle, Whipped Cream, Syrup", 
            rating: "4.8", 
            time: "20Min", 
            amt: "350", 
            offer: "15% Off | Use WAFFLE15", 
        
        },
        {
            id: 2,
            src: "https://i.pinimg.com/564x/df/f2/51/dff2516ddf36ad731d8ad6accbb9079e.jpg",
            hotelName: "The Belgian-Waffle",
            description: "Cinnamon Apple Waffle, Caramel Sauce, Fresh Fruit",
            rating: "4.7",
            time: "25Min",
            amt: "400",
            offer: "20% Off | Use CINNAMON20",
          },
          
          {
            id: 3,
            src: "https://i.pinimg.com/736x/79/a1/48/79a1483bccad5095d319517a71368ebf.jpg",
            hotelName: "The Belgian-Waffle",
            description: "Chocolate Chip Waffle, Whipped Cream, Chocolate Sauce",
            rating: "4.6",
            time: "22Min",
            amt: "380",
            offer: "10% Off | Use CHOCOLATE10",
          },
          
          {
            id: 4,
            src: "https://i.pinimg.com/564x/92/30/50/923050ada8669029641cea3a62012552.jpg",
            hotelName: "The Belgian-Waffle",
            description: "Belgian Waffle, Fresh Berries, Whipped Cream",
            rating: "4.9",
            time: "30Min",
            amt: "600",
            offer: "20% Off | Use BELGIAN20",
          },
          
          {
            id: 5,
            src: "https://i.pinimg.com/564x/be/d0/4d/bed04d1570b1ea61dd818ac69382c405.jpg",
            hotelName: "The Belgian-Waffle",
            description: "Banana Foster Waffle, Caramel Sauce, Whipped Cream",
            rating: "4.5",
            time: "18Min",
            amt: "320",
            offer: "15% Off | Use BANANA15",
          },
          
          {
            id: 6,
            src: "https://i.pinimg.com/564x/65/e9/52/65e952a41ce3bb30b24d839f20446062.jpg",
            hotelName: "The Belgian-Waffle",
            description: "Strawberry Waffle, Whipped Cream, Fresh Fruit",
            rating: "4.7",
            time: "20Min",
            amt: "340",
            offer: "25% Off | Use STRAWBERRY25",
          },
          
          {
            id: 7,
            src: "https://i.pinimg.com/564x/70/c2/42/70c24238053e05e4c2b4d94962d55826.jpg",
            hotelName: "The Belgian-Waffle",
            description: "Cinnamon Roll Waffle, Caramel Sauce, Whipped Cream",
            rating: "4.6",
            time: "15Min",
            amt: "300",
            offer: "20% Off | Use CINNAMONROLL20",
          },
          
          {
            id: 8,
            src: "https://i.pinimg.com/564x/b9/f4/9c/b9f49c82fdb0a1e49c19ced00c903c4b.jpg",
            hotelName: "The Belgian-Waffle",
            description: "Peanut Butter Waffle, Banana, Honey",
            rating: "4.5",
            time: "12Min",
            amt: "250",
            offer: "10% Off | Use PEANUTBUTTER10",
          },
          {
            id: 9,
            src: "https://i.pinimg.com/736x/c8/74/cf/c874cf4a09fe634e8cffa3e1cee305d5.jpg",
            hotelName: "The Belgian-Waffle",
            description: "Blueberry Waffle, Whipped Cream, Fresh Fruit",
            rating: "4.7",
            time: "22Min",
            amt: "370",
            offer: "15% Off | Use BLUEBERRY15",
          },
          
          {
            id: 10,
            src: "https://i.pinimg.com/564x/22/f6/10/22f6101dffa7bae05eb101a023b5a882.jpg",
            hotelName: "The Belgian-Waffle",
            description: "Chocolate Banana Waffle, Whipped Cream, Chocolate Sauce",
            rating: "4.8",
            time: "18Min",
            amt: "280",
            offer: "10% Off | Use CHOCOBANANA10",
          },
          
          {
            id: 11,
            src: "https://i.pinimg.com/564x/a5/8f/93/a58f93818564b86913b002342660516f.jpg",
            hotelName: "The Belgian-Waffle",
            description: "Caramel Pecan Waffle, Whipped Cream, Caramel Sauce",
            rating: "4.6",
            time: "20Min",
            amt: "350",
            offer: "20% Off | Use CARAMEL20",
          },
          
          {
            id: 12,
            src: "https://i.pinimg.com/564x/c0/09/44/c00944416884557a8d6fccc1051c7d27.jpg",
            hotelName: "The Belgian-Waffle",
            description: "Red Velvet Waffle, Whipped Cream, Fresh Fruit",
            rating: "4.7",
            time: "22Min",
            amt: "360",
            offer: "25% Off | Use REDVELVET25",
          }

    ],
    Barbeque:[
        {
            id: 1,
            src: "https://i.pinimg.com/564x/37/94/a8/3794a80d25c569c81ec1b06405841b36.jpg",
            hotelName: "Barbecue",
            description: "Grilled Chicken, BBQ Sauce, Coleslaw",
            rating: "4.8",
            time: "20Min",
            amt: "350",
            offer: "15% Off | Use BBQ15",
          },
          
          {
            id: 2,
            src: "https://i.pinimg.com/736x/bd/7b/bc/bd7bbc03f3f68c36be263b76825dbdb7.jpg",
            hotelName: "Barbecue",
            description: "Pulled Pork, Baked Beans, Cornbread",
            rating: "4.7",
            time: "25Min",
            amt: "400",
            offer: "20% Off | Use PORK20",
          },
          
          {
            id: 3,
            src: "https://i.pinimg.com/564x/45/ca/bc/45cabc24d5cb0d1aaf13e974ba8dec3a.jpg",
            hotelName: "Barbecue",
            description: "Ribs, Coleslaw, Baked Beans",
            rating: "4.6",
            time: "22Min",
            amt: "380",
            offer: "10% Off | Use RIBS10",
          },
          
          {
            id: 4,
            src: "https://i.pinimg.com/564x/d8/39/bf/d839bf03a7c6d1dd72cc85cf6aac843d.jpg",
            hotelName: "Barbecue",
            description: "Brisket, BBQ Sauce, Grilled Vegetables",
            rating: "4.9",
            time: "30Min",
            amt: "600",
            offer: "20% Off | Use BRISKET20",
          },
          
          {
            id: 5,
            src: "https://i.pinimg.com/564x/d5/e2/2f/d5e22f383e70fbc3397272642f2b2637.jpg",
            hotelName: "Barbecue",
            description: "Grilled Sausages, Peppers, Onions",
            rating: "4.5",
            time: "18Min",
            amt: "320",
            offer: "15% Off | Use SAUSAGE15",
          },
          
          {
            id: 6,
            src: "https://i.pinimg.com/564x/ee/3f/42/ee3f4205fdef08f84eb756e4464ec257.jpg",
            hotelName: "Barbecue",
            description: "Burnt Ends, BBQ Sauce, Coleslaw",
            rating: "4.7",
            time: "20Min",
            amt: "340",
            offer: "25% Off | Use BURNT25",
          },
          
          {
            id: 7,
            src: "https://i.pinimg.com/564x/77/73/4a/77734a785ba693c5a838f1835921f5e1.jpg",
            hotelName: "Barbecue",
            description: "Grilled Chicken, BBQ Sauce, Baked Beans",
            rating: "4.6",
            time: "15Min",
            amt: "300",
            offer: "20% Off | Use CHICKEN20",
          },
          
          {
            id: 8,
            src: "https://i.pinimg.com/564x/e3/6e/18/e36e181542e12ed7b09204d8b49c540f.jpg",
            hotelName: "Barbecue",
            description: "Pulled Pork Sandwich, Coleslaw, Pickles",
            rating: "4.5",
            time: "12Min",
            amt: "250",
            offer: "10% Off | Use PORK10",
          },
          
          {
            id: 9,
            src: "https://i.pinimg.com/564x/32/92/26/329226aefba8555f292a0479717429ae.jpg",
            hotelName: "Barbecue",
            description: "Ribs, BBQ Sauce, Grilled Vegetables",
            rating: "4.7",
            time: "22Min",
            amt: "370",
            offer: "15% Off | Use RIBS15",
          },
          
          {
            id: 10,
            src: "https://i.pinimg.com/736x/8d/44/39/8d4439ba92c17a863dd0f6fe6d69b6e3.jpg",
            hotelName: "Barbecue",
            description: "Grilled Steak, Roasted Vegetables, Mashed Potatoes",
            rating: "4.8",
            time: "18Min",
            amt: "280",
            offer: "10% Off | Use STEAK10",
          },
          
          {
            id: 11,
            src: "https://i.pinimg.com/564x/c8/d2/a4/c8d2a4ec2846594edc4085bef1cbfa34.jpg",
            hotelName: "Barbecue",
            description: "Smoked Brisket, BBQ Sauce, Coleslaw",
            rating: "4.6",
            time: "20Min",
            amt: "350",
            offer: "20% Off | Use BRISKET20",
          },
          
          {
            id: 12,
            src: "https://i.pinimg.com/736x/1c/7e/1d/1c7e1dd7b147ab0c28bfa34fd8e7edfa.jpg",
            hotelName: "Barbecue",
            description: "Grilled Chicken Wings, BBQ Sauce, Celery Sticks",
            rating: "4.7",
            time: "22Min",
            amt: "360",
            offer: "25% Off | Use WINGS25",
          },
    ],
    BigBowl:[
        {
            id: 1,
            src: "https://i.pinimg.com/564x/1d/d0/28/1dd028aff6ba1dfe903a74cd10027c04.jpg",
            hotelName: "BIG-BOWL",
            description: "Spicy Noodles, Vegetables, and Meat",
            rating: "4.8",
            time: "20Min",
            amt: "350",
            offer: "15% Off | Use NOODLES15",
          },
          
          {
            id: 2,
            src: "https://i.pinimg.com/564x/a2/b1/69/a2b1694904f33e8047ad7cf905c677d6.jpg",
            hotelName: "BIG-BOWL",
            description: "Crispy Fried Chicken, Coleslaw, and Fries",
            rating: "4.7",
            time: "25Min",
            amt: "400",
            offer: "20% Off | Use CHICKEN20",
          },
          
          {
            id: 3,
            src: "https://i.pinimg.com/564x/53/d7/d9/53d7d9a180e533b53be5bf9ea6f68631.jpg",
            hotelName: "BIG-BOWL",
            description: "Grilled Fish, Rice, and Steamed Vegetables",
            rating: "4.6",
            time: "22Min",
            amt: "380",
            offer: "10% Off | Use FISH10",
          },
          
          {
            id: 4,
            src: "https://i.pinimg.com/736x/bc/bc/fc/bcbcfcdfe33e514f2140dc69342c9c61.jpg",
            hotelName: "BIG-BOWL",
            description: "Beef and Mushroom Stroganoff, Egg Noodles",
            rating: "4.9",
            time: "30Min",
            amt: "600",
            offer: "20% Off | Use STROGANOFF20",
          },
          
          {
            id: 5,
            src: "https://i.pinimg.com/564x/10/41/f1/1041f159f07d6e610fdf64bb08df9ee3.jpg",
            hotelName: "BIG-BOWL",
            description: "Veggie Burger, Fries, and Coleslaw",
            rating: "4.5",
            time: "18Min",
            amt: "320",
            offer: "15% Off | Use VEGGIE15",
          },
          
          {
            id: 6,
            src: "https://i.pinimg.com/736x/e4/04/2c/e4042c433115f9b6821b707151f4673a.jpg",
            hotelName: "BIG-BOWL",
            description: "Chicken Quesadilla, Sour Cream, and Salsa",
            rating: "4.7",
            time: "20Min",
            amt: "340",
            offer: "25% Off | Use QUESADILLA25",
          },
          
          {
            id: 7,
            src: "https://i.pinimg.com/564x/79/19/7b/79197bf65655eaa588105607fd8c3cb5.jpg",
            hotelName: "BIG-BOWL",
            description: "Egg and Cheese Omelette, Toast, and Hash Browns",
            rating: "4.6",
            time: "15Min",
            amt: "300",
            offer: "20% Off | Use OMELETTE20",
          },
          
          {
            id: 8,
            src: "https://i.pinimg.com/564x/9b/2a/19/9b2a192201060e7362418b7117c31eef.jpg",
            hotelName: "BIG-BOWL",
            description: "Tom Yum Soup, Spring Rolls, and Fried Wontons",
            rating: "4.5",
            time: "12Min",
            amt: "250",
            offer: "10% Off | Use SOUP10",
          },
          
          {
            id: 9,
            src: "https://i.pinimg.com/564x/58/4f/43/584f430dd54f19fd2a36e1391fcf7507.jpg",
            hotelName: "BIG-BOWL",
            description: "Grilled Chicken Caesar Salad, Croutons, and Parmesan",
            rating: "4.7",
            time: "22Min",
            amt: "370",
            offer: "15% Off | Use CAESAR15",
          },
          
          {
            id: 10,
            src: "https://i.pinimg.com/736x/4d/10/a2/4d10a2e18b838baca23a1686aab4b710.jpg",
            hotelName: "BIG-BOWL",
            description: "Fried Chicken Tenders, Dipping Sauce, and Coleslaw",
            rating: "4.8",
            time: "18Min",
            amt: "280",
            offer: "10% Off | Use TENDERS10",
          },
          
          {
            id: 11,
            src: "https://i.pinimg.com/736x/33/cb/5a/33cb5a100c67e44b784cd242de34266f.jpg",
            hotelName: "BIG-BOWL",
            description: "Beef and Broccoli Stir-Fry, Steamed Rice",
            rating: "4.6",
            time: "20Min",
            amt: "350",
            offer: "20% Off | Use STIRFRY20",
          },
          
          {
            id: 12,
            src: "https://i.pinimg.com/564x/99/d1/89/99d18953c16e09bc88119e31aa4ee316.jpg",
            hotelName: "BIG-BOWL",
            description: "Sesame Chicken, Steamed Vegetables, and Fried Rice",
            rating: "4.7",
            time: "22Min",
            amt: "360",
            offer: "25% Off | Use SESAME25",
          },
    ],
    KFC:[
        {
            id: 1,
            src: "https://i.pinimg.com/564x/f0/eb/a6/f0eba657c28142f5bcaf706a2e54ea77.jpg",
            hotelName: "KFC",
            description: "Original Recipe Chicken Bucket, Fries, and Coleslaw",
            rating: "4.8",
            time: "20Min",
            amt: "350",
            offer: "15% Off | Use KFC15",
          },
          
          {
            id: 2,
            src: "https://i.pinimg.com/564x/14/7b/f8/147bf894d0d17ddbd5d422d6506eaad0.jpg",
            hotelName: "KFC",
            description: "Crispy Chicken Sandwich, Fries, and Drink",
            rating: "4.7",
            time: "25Min",
            amt: "400",
            offer: "20% Off | Use KFC20",
          },
          
          {
            id: 3,
            src: "https://i.pinimg.com/564x/0c/c6/14/0cc61431cc1e7e4140258b2b756d67c7.jpg",
            hotelName: "KFC",
            description: "Chicken Nuggets, Fries, and Dipping Sauce",
            rating: "4.6",
            time: "22Min",
            amt: "380",
            offer: "10% Off | Use NUGGETS10",
          },
          
          {
            id: 4,
            src: "https://i.pinimg.com/736x/64/75/bd/6475bd8715ee6b0d86134cf6bd595233.jpg",
            hotelName: "KFC",
            description: "Zinger Burger, Fries, and Coleslaw",
            rating: "4.9",
            time: "30Min",
            amt: "600",
            offer: "20% Off | Use ZINGER20",
          },
          
          {
            id: 5,
            src: "https://i.pinimg.com/736x/45/65/ba/4565ba7e15e0c63c49d5c9cf5bd0eca6.jpg",
            hotelName: "KFC",
            description: "Chicken Popcorn, Fries, and Drink",
            rating: "4.5",
            time: "18Min",
            amt: "320",
            offer: "15% Off | Use POPCORN15",
          },
          
          {
            id: 6,
            src: "https://i.pinimg.com/564x/2e/5e/5d/2e5e5dd49516daffe6473b66c2ef46ff.jpg",
            hotelName: "KFC",
            description: "Chicken Wings, Fries, and Dipping Sauce",
            rating: "4.7",
            time: "20Min",
            amt: "340",
            offer: "25% Off | Use WINGS25",
          },
          
          {
            id: 7,
            src: "https://i.pinimg.com/736x/54/8f/58/548f58db3f253a11cba01f01c9ccae12.jpg",
            hotelName: "KFC",
            description: "Chicken Breast, Fries, and Coleslaw",
            rating: "4.6",
            time: "15Min",
            amt: "300",
            offer: "20% Off | Use BREAST20",
          },
          
          {
            id: 8,
            src: "https://i.pinimg.com/736x/d5/a1/16/d5a116fccb54e556fc994a12af2709cd.jpg",
            hotelName: "KFC",
            description: "Chicken Tenders, Fries, and Dipping Sauce",
            rating: "4.5",
            time: "12Min",
            amt: "250",
            offer: "10% Off | Use TENDERS10",
          },
          
          {
            id: 9,
            src: "https://i.pinimg.com/736x/c0/c3/4a/c0c34a3242981df233b77c7a0592f6c2.jpg",
            hotelName: "KFC",
            description: "Chicken Caesar Salad, Croutons, and Parmesan",
            rating: "4.7",
            time: "22Min",
            amt: "370",
            offer: "15% Off | Use CAESAR15",
          },
          
          {
            id: 10,
            src: "https://i.pinimg.com/564x/e0/d7/d2/e0d7d2b54d2d8fd2cb6d5b876c439481.jpg",
            hotelName: "KFC",
            description: "Chicken Sandwich, Fries, and Drink",
            rating: "4.8",
            time: "18Min",
            amt: "280",
            offer: "10% Off | Use SANDWICH10",
          },
          
          {
            id: 11,
            src: "https://i.pinimg.com/564x/f6/b1/5a/f6b15ae43084458804892cdb6d0a4f92.jpg",
            hotelName: "KFC",
            description: "Chicken Bucket, Fries, and Coleslaw",
            rating: "4.6",
            time: "20Min",
            amt: "350",
            offer: "20% Off | Use BUCKET20",
          },
          
          {
            id: 12,
            src: "https://i.pinimg.com/736x/a3/8a/0b/a38a0bd672aa7bcf263f65aa08aa8b28.jpg",
            hotelName: "KFC",
            description: "Chicken Wings, Fries, and Dipping Sauce",
            rating: "4.7",
            time: "22Min",
            amt: "360",
            offer: "25% Off | Use WINGS25",
          },
    ],
    BurgerKing:[
      {
        id: 1,
        src: "https://i.pinimg.com/736x/32/a0/dc/32a0dc40da125a64ae35210ba84221ef.jpg",
        hotelName: "Burger King",
        description: "Whopper Sandwich, Fries, and Drink",
        rating: "4.8",
        time: "20Min",
        amt: "350",
        offer: "15% Off | Use WHOPPER15",
      },
      
      {
        id: 2,
        src: "https://i.pinimg.com/564x/d8/39/12/d839128eb7d0689f0eadc50995b11333.jpg",
        hotelName: "Burger King",
        description: "Bacon King Sandwich, Fries, and Drink",
        rating: "4.7",
        time: "25Min",
        amt: "400",
        offer: "20% Off | Use BACON20",
      },
      
      {
        id: 3,
        src: "https://i.pinimg.com/564x/c4/1c/0e/c41c0ea39f9acebfe945fde9cc7ee433.jpg",
        hotelName: "Burger King",
        description: "Impossible Whopper, Fries, and Drink",
        rating: "4.6",
        time: "22Min",
        amt: "380",
        offer: "10% Off | Use IMPOSSIBLE10",
      },
      
      {
        id: 4,
        src: "https://i.pinimg.com/564x/ef/77/fd/ef77fdac131e76f09468303b68bf984b.jpg",
        hotelName: "Burger King",
        description: "Double Whopper Sandwich, Fries, and Drink",
        rating: "4.9",
        time: "30Min",
        amt: "600",
        offer: "20% Off | Use DOUBLE20",
      },
      
      {
        id: 5,
        src: "https://c8.alamy.com/comp/2J0C011/chickenburger-chicken-chicken-burger-menu-fries-drink-free-plate-exempted-2J0C011.jpg",
        hotelName: "Burger King",
        description: "Chicken Sandwich, Fries, and Drink",
        rating: "4.5",
        time: "18Min",
        amt: "320",
        offer: "15% Off | Use CHICKEN15",
      },
      
      {
        id: 6,
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrfOV4QbA2DtQrVOt009K0D1SU-6NCCN9w8g&s",
        hotelName: "Burger King",
        description: "Burger King Meal, Fries, and Drink",
        rating: "4.7",
        time: "20Min",
        amt: "340",
        offer: "25% Off | Use MEAL25",
      },
      
      {
        id: 7,
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc5wLDhQkuyK6cRBDyUtN4Sed6s74zFpetbg&s",
        hotelName: "Burger King",
        description: "Breakfast Sandwich, Hash Browns, and Coffee",
        rating: "4.6",
        time: "15Min",
        amt: "300",
        offer: "20% Off | Use BREAKFAST20",
      },
      
      {
        id: 8,
        src: "https://t4.ftcdn.net/jpg/00/99/82/31/360_F_99823178_SEgzQ02E1GkV2I5nEXK2Dm8IjrfVssxA.jpg",
        hotelName: "Burger King",
        description: "French Fries, Soft Drink, and Burger",
        rating: "4.5",
        time: "12Min",
        amt: "250",
        offer: "10% Off | Use FRIES10",
      },
      
      {
        id: 9,
        src: "https://c8.alamy.com/comp/2BRT9M2/club-sandwich-potato-fries-chips-and-glass-of-cola-drink-with-ice-fast-food-take-away-2BRT9M2.jpg",
        hotelName: "Burger King",
        description: "Club Sandwich, Fries, and Drink",
        rating: "4.7",
        time: "22Min",
        amt: "370",
        offer: "15% Off | Use CLUB15",
      },
      
      {
        id: 10,
        src: "https://img.freepik.com/premium-photo/portion-chicken-nuggets-with-portion-french-fries-drink-blurred-restaurant-background_846485-37871.jpg",
        hotelName: "Burger King",
        description: "Chicken Nuggets, Fries, and Drink",
        rating: "4.8",
        time: "18Min",
        amt: "280",
        offer: "10% Off | Use NUGGETS10",
      },
      
      {
        id: 11,
        src: "https://c8.alamy.com/comp/PT7MPY/fresh-beef-burger-with-sauce-and-vegetables-and-glass-of-cola-soft-drink-with-potato-chips-fries-on-stone-kitchen-background-PT7MPY.jpg",
        hotelName: "Burger King",
        description: "Beef Burger, Fries, and Drink",
        rating: "4.6",
        time: "20Min",
        amt: "350",
        offer: "20% Off | Use BEEF20",
      },
      
      {
        id: 12,
        src: "https://c8.alamy.com/comp/2J0YDDY/high-angle-view-of-hot-dog-with-french-fries-sauces-and-drink-on-table-2J0YDDY.jpg",
        hotelName: "Burger King",
        description: "Sausage Sandwich, Fries, and Drink",
        rating: "4.7",
        time: "22Min",
        amt: "360",
        offer: "25% Off | Use SAUSAGE25",
      },

    ],
    McDonald:[
      {
        id: 1,
        src: "https://thumbs.dreamstime.com/z/moscow-russia-march-mcdonald-s-big-mac-hamburger-menu-french-fries-coca-cola-moscow-russia-march-mcdonald-s-big-mac-hamburger-112197884.jpg",
        hotelName: "McDonald's",
        description: "Big Mac, Fries, Drink",
        rating: "4.5",
        time: "15Min",
        amt: "300",
        offer: "20% Off | Use MAC20",
      },
    
      {
        id: 2,
        src: "https://th.bing.com/th/id/OIP.T-Ay448jC55UlUsWm7pAUAHaGI?rs=1&pid=ImgDetMain",
        hotelName: "McDonald's",
        description: "McChicken, Fries, Drink",
        rating: "4.3",
        time: "18Min",
        amt: "250",
        offer: "25% Off | Use CHICK25",
      },
    
      {
        id: 3,
        src: "https://th.bing.com/th/id/OIP.8RlDaZIktO4qaGSTba37lwHaFJ?rs=1&pid=ImgDetMain",
        hotelName: "McDonald's",
        description: "Quarter Pounder, Fries, Drink",
        rating: "4.4",
        time: "20Min",
        amt: "320",
        offer: "15% Off | Use QTR15",
      },
    
      {
        id: 4,
        src: "https://i.pinimg.com/564x/f7/78/3c/f7783c85ffee332c3944ba4defb6607c.jpg",
        hotelName: "McDonald's",
        description: "Filet-O-Fish, Fries, Drink",
        rating: "4.2",
        time: "17Min",
        amt: "280",
        offer: "10% Off | Use FISH10",
      },
    
      {
        id: 5,
        src: "https://th.bing.com/th/id/OIP.a6yAJfyZuWPIFIxTLihgsgAAAA?rs=1&pid=ImgDetMain",
        hotelName: "McDonald's",
        description: "McVeggie, Fries, Drink",
        rating: "4.1",
        time: "15Min",
        amt: "240",
        offer: "30% Off | Use VEG30",
      },
    
      {
        id: 6,
        src: "https://i.pinimg.com/736x/af/db/a0/afdba0506263d9c33ef1defc93bff4cd.jpg",
        hotelName: "McDonald's",
        description: "McSpicy Paneer, Fries, Drink",
        rating: "4.3",
        time: "18Min",
        amt: "260",
        offer: "25% Off | Use SPICY25",
      },
    
      {
        id: 7,
        src: "https://th.bing.com/th/id/OIP.yFMeemeD3kZ3e5UjsTnJuQHaD_?rs=1&pid=ImgDetMain",
        hotelName: "McDonald's",
        description: "Egg McMuffin, Hash Browns, Coffee",
        rating: "4.4",
        time: "12Min",
        amt: "220",
        offer: "20% Off | Use MUFFIN20",
      },
    
      {
        id: 8,
        src: "https://th.bing.com/th/id/OIP.L4R8Ewd2sk7RbZsSsa6ErwAAAA?rs=1&pid=ImgDetMain",
        hotelName: "McDonald's",
        description: "Chicken McNuggets, Fries, Drink",
        rating: "4.6",
        time: "16Min",
        amt: "270",
        offer: "15% Off | Use NUGGET15",
      },
    
      {
        id: 9,
        src: "https://facts.net/wp-content/uploads/2023/06/Mcflurry-flavors.jpeg",
        hotelName: "McDonald's",
        description: "McFlurry, Fries, Drink",
        rating: "4.5",
        time: "10Min",
        amt: "180",
        offer: "10% Off | Use FLURRY10",
      },
    
      {
        id: 10,
        src: "https://th.bing.com/th/id/OIP.iAr0en1ecgRy-yv0GQF53wHaEs?rs=1&pid=ImgDetMain",
        hotelName: "McDonald's",
        description: "Happy Meal, Fries, Drink",
        rating: "4.7",
        time: "15Min",
        amt: "200",
        offer: "15% Off | Use HAPPY15",
      },
    
      {
        id: 11,
        src: "https://i.pinimg.com/564x/fd/0a/8f/fd0a8f6f5e405be6cf0b00265d9b9b43.jpg",
        hotelName: "McDonald's",
        description: "Cheeseburger, Fries, Drink",
        rating: "4.3",
        time: "14Min",
        amt: "230",
        offer: "20% Off | Use CHEESE20",
      },
    
      {
        id: 12,
        src: "https://th.bing.com/th/id/OIP.s8ck1xud-8mWnF-w6WxhjAHaEZ?rs=1&pid=ImgDetMain",
        hotelName: "McDonald's",
        description: "Double Cheeseburger, Fries, Drink",
        rating: "4.6",
        time: "18Min",
        amt: "330",
        offer: "25% Off | Use DOUBLE25",
      },

    ]
};

// Modify renderProducts function
function renderProducts(restaurantName) {
    let productList;
    if (restaurantName && restaurantProducts[restaurantName]) {
        productList = restaurantProducts[restaurantName];
    } else {
        // If no restaurant specified or not found, show a message
        list.innerHTML = "<p>No products available for this restaurant.</p>";
        return;
    }

    list.innerHTML = ''; // Clear existing products

    productList.forEach((product) => {
        const vidDiv = document.createElement("div");
        vidDiv.className = 'cardDiv';

        vidDiv.innerHTML = `<div class="vid-list" data-name="p-1">
            <img src="${product.src}" class="img-class" alt="Product Image"/>
            <div class="flex-div">
                <div class="vid-info">
                    <a href="" class="title">${product.description}</a>
                    <p>${product.description}</p>
                    <p>Desserts, Beverages and lot more...</p>
                    <div class="btns flex-div">
                        <div class="rating"> <span class="fas fa-star">${product.rating}</span> </div> 
                        <div class="time">${product.time}</div> 
                        <div class="amt">RS.${product.amt}</div>
                    </div>
                    <div class="offers">
                        <p>${product.offer}</p>
                        <button id="add" class="button" onclick="addToCart(${product.id})">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>`;

        list.appendChild(vidDiv);
    });
}

// Remove old renderProdcuts() call
// renderProdcuts();

// The rest of your code remains the same
let btnAdd = document.querySelector('button');
if (btnAdd) {
    btnAdd.addEventListener('click', () => {
        btnAdd.innerText = "Go To cart";
    });
}

const cartItemsEl = document.querySelector(".box"); // box
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");

const cartItem = document.getElementById("shopping-cart");

let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// ADD TO CART
function addToCart(id) {
    // check if product already exists in cart
    if (cart.some((item) => item.id === id)) {
        changeNumberOfUnits("plus", id);
    } else {
        // Need to find the product in the current productList
        const productList = restaurantProducts[restaurantName];
        const item = productList.find((product) => product.id === id);
        if (item) {
            cart.push({
                ...item,
                numberOfUnits: 1,
            });
        }
    }

    updateCart();
}

// update cart
function updateCart() {
    renderCartItems();
    renderSubtotal();

    // save cart to local storage
    localStorage.setItem("CART", JSON.stringify(cart));
}

// calculate and render subtotal
function renderSubtotal() {
    let totalPrice = 0,
        totalItems = 0;

    cart.forEach((item) => {
        totalPrice += item.amt * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    });

    subtotalEl.innerHTML = `Total (${totalItems} items): INR ${totalPrice}`;
    totalItemsInCartEl.innerHTML = totalItems;
}

function renderCartItems() {
    cartItemsEl.innerHTML = ""; // clear cart element
    cart.forEach((item) => {
        cartItemsEl.innerHTML += `<table>
        <tr>
          <th>Item</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Remove</th>
        </tr>
        <tr>
          <td><div class="img"><img src="${item.src}" alt=""></div></td>
          <td><div class="cart-content">
                <div class="des">
                        ${item.description}
                    </div>
                    <span class="price">Amount:Rs.${item.amt}</span></div>
                 </td>
          <td><div class="units">
                    <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                    <div class="number">${item.numberOfUnits}</div>
                    <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
                </div></td>
                <td><i class="fas fa-trash" onclick="removeItemFromCart(${item.id})"></i></td>
        </tr>
        </table>
        
        `;
    });
}

// remove item from cart
function removeItemFromCart(id) {
    cart = cart.filter((item) => item.id !== id);

    updateCart();
}

// change number of units for an item
function changeNumberOfUnits(action, id) {
    cart = cart.map((item) => {
        let numberOfUnits = item.numberOfUnits;

        if (item.id === id) {
            if (action === "minus" && numberOfUnits > 1) {
                numberOfUnits--;
            } else if (action === "plus") {
                numberOfUnits++;
            }
        }

        return {
            ...item,
            numberOfUnits,
        };
    });

    updateCart();
}

function searchProducts() {
    let input = document.getElementById("search-box").value.toUpperCase(); // Get search input
    let productListEl = document.getElementById("list-container");
    let cards = productListEl.getElementsByClassName("cardDiv"); // Select the product cards
  
    // Loop through all the product cards
    for (let i = 0; i < cards.length; i++) {
      let descriptionElement = cards[i].querySelector("p"); // The element that holds the description (first <p> tag in the card)
      let description = descriptionElement ? descriptionElement.innerText.toUpperCase() : ""; // Get description and convert to uppercase
  
      // If the description contains the search input, show the card, otherwise hide it
      if (description.indexOf(input) > -1) {
        cards[i].style.display = "block";  // Show the card if description matches
      } else {
        cards[i].style.display = "none";   // Hide the card if description doesn't match
      }
    }
}

function randomizeProducts() {
    // Get the current productList
    let productList = restaurantProducts[restaurantName];
    if (!productList) {
        return;
    }
    // Shuffle the productList array
    const shuffledProducts = productList.sort(() => Math.random() - 0.5);
    
    // Clear existing products from the list
    list.innerHTML = '';
    
    // Render the shuffled products
    shuffledProducts.forEach((product) => {
        const vidDiv = document.createElement("div");
        vidDiv.className = 'cardDiv';
  
        vidDiv.innerHTML = `<div class="vid-list" data-name="p-1">
             <img src="${product.src}" class="img-class" alt="Product Image">
             
         <div class="flex-div">
           <div class="vid-info">
             <a href="" class="title">${product.description}</a>
             <p>${product.description}</p>
             <p>Desserts, Beverages and more...</p>
             <div class="btns flex-div">
                 <div class="rating"> <span class="fas fa-star">${product.rating}</span> </div> 
                 <div class="time">${product.time}</div> 
                 <div class="amt">RS.${product.amt}</div>
             </div>
             <div class="offers">
             <p>${product.offer}</p>
             <button id="add-${product.id}" class="button" onclick="addToCart(${product.id})">Add to cart</button>
         </div>
           </div>
         </div>
       </div>`;
  
        list.appendChild(vidDiv);
    });
}
