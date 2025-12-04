document.addEventListener('DOMContentLoaded', function() {
  // Toggle Mobile Menu
  function toggleMenu() {
    let menu = document.getElementById("mobileMenu");
    menu.style.right = menu.style.right === "0px" ? "-250px" : "0px";
  }

  window.toggleMenu = toggleMenu; // make it accessible in HTML onclick

  // Initialize Swiper
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 10 },
      640: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 30 },
      1200: { slidesPerView: 4, spaceBetween: 30 },
    },
  });

  // Cart functionality
  let cart = [];
  const cartCount = document.getElementById("cartCount");
  const cartPopup = document.getElementById("cartPopup");
  const cartItems = document.getElementById("cartItems");

  // Add to Cart Buttons
  const addButtons = document.querySelectorAll(".btn-add");
  addButtons.forEach(btn => {
    btn.addEventListener("click", function() {
      const productCard = this.closest(".product-card");
      const product = {
        title: productCard.querySelector("h3").innerText,
        price: productCard.querySelector(".current").innerText,
        image: productCard.querySelector("img").src
      };
      cart.push(product);
      cartCount.innerText = cart.length; // Update cart number
      showToaster("Product added to cart!");
    });
  });

  // Show Cart
  document.querySelector(".cart").addEventListener("click", showCart);

  function showCart() {
    cartItems.innerHTML = "";
    cart.forEach(item => {
      cartItems.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}" alt="">
          <div>
            <h4>${item.title}</h4>
            <p>${item.price}</p>
          </div>
        </div>
      `;
    });
    cartPopup.style.display = "block";
  }

  // Close Cart
  window.closeCart = function() {
    cartPopup.style.display = "none";
  }

  // View Cart Button
  window.viewCart = function() {
    window.location.href = 'cart-page.html';
  }

  // Toaster
  function showToaster(message) {
    const toast = document.getElementById("toaster");
    toast.innerText = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }

  // Order Form Redirect
document.getElementById('confirmOrder').addEventListener('click', function(e) {
  e.preventDefault();
  
  const form = document.getElementById('orderForm');
  
  if (form.checkValidity()) {
    window.location.href = 'thankyou-page.html';
  } else {
    form.reportValidity(); // show validation errors
  }
});

});
