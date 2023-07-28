/* get cart total from session on load */
updateCartTotal();

/* button event listeners */
document.getElementById("emptycart").addEventListener("click", emptyCart);

  
  function addToCart(elem) {
    var productContainer = elem.closest(".product");
    if (!productContainer) {
      console.error("Product container not found!");
      return;
    }
  
    var getprice = productContainer.querySelector(".price").innerText;
    var getproductName = productContainer.querySelector(".productname").innerText;
  
}
function getPriceValue(elem) {
    var priceStr = elem.getAttribute("data-price");
    return parseFloat(priceStr.split("$")[1]);
  }
  
  // Function to format price for display
  function formatPriceDisplay(price) {
    if (price >= 1000000) {
      return (price / 1000000).toFixed(1) + "M";
    } else if (price >= 1000) {
      return (price / 1000).toFixed(1) + "k";
    } else {
      return price.toFixed(2);
    }
  }
  

/* Updated addToCart function */

function addToCart(elem) {
    // Rest of the code remains the same
  
    //create product object
    var product = {
      productname: getproductName,
      price: getprice
    };
    // Add the original full price to the data-price attribute
    elem.setAttribute("data-price", getprice);
    //convert product data to JSON for storage
    var stringProduct = JSON.stringify(product);
    /*send product data to session storage */
  
    // Rest of the code remains the same
  }
  
  /* Updated updateCartTotal function */
  
  function updateCartTotal(newPrice = null, isAdd = false) {
    // Rest of the code remains the same
  
    // Inside the for loop where you are building the cart table, use formatPriceDisplay() function
    carttable += "<tr><td>" + productname + "</td><td>$" + formatPriceDisplay(price) + "</td></tr>";
  
    // Rest of the code remains the same
  }

/* ADD TO CART functions */

function addToCart(elem) {
    //init
    var sibs = [];
    var getprice;
    var getproductName;
    var cart = [];
     var stringCart;
    //cycles siblings for product info near the add button
    while(elem = elem.previousSibling) {
        if (elem.nodeType === 3) continue; // text node
        if(elem.className == "price"){
            getprice = elem.innerText;
        }
        if (elem.className == "productname") {
            getproductName = elem.innerText;
        }
        sibs.push(elem);
    }
    //create product object
    var product = {
        productname : getproductName,
        price : getprice
    };
   /* console.log(price)**********************************************************************************************/
    //convert product data to JSON for storage
    var stringProduct = JSON.stringify(product);
    /*send product data to session storage */
    
    if(!sessionStorage.getItem('cart')){
        //append product JSON object to cart array
        cart.push(stringProduct);
        //cart to JSON
        stringCart = JSON.stringify(cart);
        //create session storage cart item
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
    else {
        //get existing cart data from storage and convert back into array
       cart = JSON.parse(sessionStorage.getItem('cart'));
        //append new product JSON object
        cart.push(stringProduct);
        //cart back to JSON
        stringCart = JSON.stringify(cart);
        //overwrite cart data in sessionstorage 
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
}
/*function sf(price){
  for i in range len(price):
    if price[i]===k:
      ....
    else if price[i]===M:
      ....
} */ 
function updateCartTotal(newPrice = null, isAdd = false) {
  //init
  var total = 0;
  var price = 0;
  var items = 0;
  var productname = "";
  var carttable = "";
  if (sessionStorage.getItem('cart')) {
    //get cart data & parse to array
    var cart = JSON.parse(sessionStorage.getItem('cart'));
    //get no of items in cart 
    items = cart.length;
    //loop over cart array
    for (var i = 0; i < items; i++) {
      //convert each JSON product in array back into object
      var x = JSON.parse(cart[i]);
      console.log("x", x);
    
      if (x.price[x.price.length - 1] == "M") {
        price = parseFloat(x.price.split('$')[1]) * 10**6;
      } else  {
        price = parseFloat(x.price.split('$')[1]) * 10**3;
      }
    
      console.log("price", price);
      productname = x.productname;
      //add price to total
      carttable += "<tr><td>" + productname + "</td><td>$" + formatPrice(price) + "</td></tr>";
      total += price;
    }
    
  }

  // If isAdd is true and a new price is provided, update the total accordingly
  if (isAdd && newPrice) {
    total += parseFloat(newPrice.split('$')[1]);
  }

  //update total on website HTML
  document.getElementById("total").innerHTML = formatPrice(total);
  //insert saved products to cart table
  document.getElementById("carttable").innerHTML = carttable;
  //update items in cart on website HTML
  document.getElementById("itemsquantity").innerHTML = items;
}

// Function to format price
function formatPrice(price) {
  if (price >= 1000000) {
    return (price / 1000000).toFixed(3) + "M";
  } else if (price >= 1000) {
    return (price / 1000).toFixed(3) + "k";
  } else {
    return price.toFixed(2);
  }
}


//user feedback on successful add
function addedToCart(pname) {
  var message = pname + " was added to the cart";
  var alerts = document.getElementById("alerts");
  alerts.innerHTML = message;
  if(!alerts.classList.contains("message")){
     alerts.classList.add("message");
     messageTimeout;
  }
}





/* User Manually empty cart */
function emptyCart() {
    //remove cart session storage object & refresh cart totals
    if(sessionStorage.getItem('cart')){
        sessionStorage.removeItem('cart');
        updateCartTotal();
      //clear message and remove class style
      var alerts = document.getElementById("alerts");
      alerts.innerHTML = "";
      if(alerts.classList.contains("message")){
          alerts.classList.remove("message");
      }
    }
}


// Function to handle "Add to Cart" button click
function addToCartClickHandler() {
  this.disabled = true;
  addToCart(this);
  var button = this;
  setTimeout(function () {
    button.disabled = false;
  }, 100);
}


// Heart button click event listener
var likeButtons = document.getElementsByClassName("like-btn");
for (var i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener("click", function () {
    this.classList.toggle("is-active");
  });
}


// Button event listeners
document.getElementById("emptycart").addEventListener("click", emptyCart);
var btns = document.getElementsByClassName("addtocart");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    this.disabled = true;
    addToCart(this);
    var button = this;
    setTimeout(function () {
      button.disabled = false;
    }, 100);
  });
}

// Heart button click event listener
var likeButtons = document.getElementsByClassName("like-btn");
for (var i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener("click", function () {
    this.classList.toggle("is-active");
  });
}


function addedToCart(pname) {
  var message = pname + " was added to the cart";
  var alerts = document.getElementById("alerts");
  alerts.innerHTML = message;
  alerts.style.opacity = 1;

  // Fade out the message after 3 seconds
  setTimeout(function () {
    alerts.style.transition = "opacity 2s ease-in-out";
    alerts.style.opacity = 0;
  }, 3000);
}

// Heart button click event listener
var likeButtons = document.getElementsByClassName("like-btn");
for (var i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener("click", function () {
    this.classList.toggle("is-active");
  });
}
