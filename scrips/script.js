document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const createMobileMenu = () => {
    const header = document.querySelector("header")
    const nav = document.querySelector(".main-nav")

    const mobileMenuBtn = document.createElement("button")
    mobileMenuBtn.classList.add("mobile-menu-btn")
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'

    header.insertBefore(mobileMenuBtn, nav)

    mobileMenuBtn.addEventListener("click", () => {
      nav.classList.toggle("active")
    })
  }

  // Check if we need to create mobile menu
  if (window.innerWidth <= 768) {
    createMobileMenu()
  }

  window.addEventListener("resize", () => {
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")

    if (window.innerWidth <= 768 && !mobileMenuBtn) {
      createMobileMenu()
    } else if (window.innerWidth > 768 && mobileMenuBtn) {
      mobileMenuBtn.remove()
      document.querySelector(".main-nav").classList.remove("active")
    }
  })

  // Order buttons functionality
  const orderButtons = document.querySelectorAll(".btn-order")

  orderButtons.forEach((button) => {
    button.addEventListener("click", function () {
      orderButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      const orderType = this.textContent
      console.log(`Order type selected: ${orderType}`)

      // Here you would typically update the UI or redirect to the appropriate page
    })
  })

  // Category selection
  const categories = document.querySelectorAll(".category")

  categories.forEach((category) => {
    category.addEventListener("click", function () {
      categories.forEach((cat) => cat.classList.remove("selected"))
      this.classList.add("selected")

      const categoryName = this.querySelector("p").textContent
      console.log(`Category selected: ${categoryName}`)

      // Here you would typically filter products or redirect to category page
    })
  })

  // Simulate loading promotions
  const loadPromotions = () => {
    const promoItems = document.querySelectorAll(".promo-item")

    // Sample promotion data (in a real app, this would come from an API)
    const promotions = [
      { name: "Combo Familiar", price: "$199", image: "promo1.jpg" },
      { name: "2x1 Martes", price: "$149", image: "promo2.jpg" },
      { name: "Pizza + Refresco", price: "$99", image: "promo3.jpg" },
    ]

    promoItems.forEach((item, index) => {
      if (promotions[index]) {
        const promo = promotions[index]

        item.innerHTML = `
                    <div class="promo-image" style="background-color: #ccc; height: 70%;"></div>
                    <div class="promo-info" style="padding: 10px;">
                        <h3>${promo.name}</h3>
                        <p>${promo.price}</p>
                    </div>
                `
      }
    })
  }

  // Simulate loading popular pizzas
  

  // Load content
  loadPromotions()
  loadPopularPizzas()

  // Login button functionality
  const loginButton = document.querySelector(".btn-login")

  if (loginButton) {
    loginButton.addEventListener("click", () => {
      // Redirect to login/register page
      window.location.href = "login-registro.html"
    })
  }

  // Chat button functionality (for header button)
  const chatButton = document.querySelector(".btn-chat")

  if (chatButton) {
    chatButton.addEventListener("click", () => {
      // Redirect to login/register page
      window.location.href = "login-registro.html"
    })
  }

  // FAQ buttons functionality
  const faqButtons = document.querySelectorAll(".faq-button")

  faqButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Aquí normalmente mostrarías la respuesta a la pregunta
      alert(`Respuesta a: ${this.textContent}`)
    })
  })
})

// Agregar al final del archivo script.js

// Funcionalidad global del carrito
const globalCart = JSON.parse(localStorage.getItem("pizzaCart")) || []

// Función para agregar producto al carrito
function addToCart(product) {
  const existingItem = globalCart.find(
    (item) => item.id === product.id && JSON.stringify(item.customizations) === JSON.stringify(product.customizations),
  )

  if (existingItem) {
    existingItem.quantity += product.quantity || 1
  } else {
    globalCart.push({
      ...product,
      quantity: product.quantity || 1,
      id: product.id || Date.now(),
    })
  }

  updateCartCount()
  saveCart()
  showCartNotification(product.name)
}

// Función para actualizar el contador del carrito
function updateCartCount() {
  const cartCount = globalCart.reduce((sum, item) => sum + item.quantity, 0)
  const cartCountElement = document.querySelector(".cart-count")

  if (cartCountElement) {
    cartCountElement.textContent = cartCount
    cartCountElement.style.display = cartCount > 0 ? "flex" : "none"
  }
}

// Función para guardar carrito en localStorage
function saveCart() {
  localStorage.setItem("pizzaCart", JSON.stringify(globalCart))
}

// Función para mostrar notificación de producto agregado
function showCartNotification(productName) {
  // Crear notificación temporal
  const notification = document.createElement("div")
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #28a745;
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `
  notification.innerHTML = `
    <i class="fas fa-check-circle"></i>
    ${productName} agregado al carrito
  `

  document.body.appendChild(notification)

  // Remover notificación después de 3 segundos
  setTimeout(() => {
    notification.remove()
  }, 3000)
}

// Actualizar todos los botones "Agregar al carrito"
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount()

  // Agregar event listeners a todos los botones de agregar al carrito
  document.querySelectorAll(".btn-add").forEach((button) => {
    button.addEventListener("click", function () {
      const productElement = this.closest(".menu-item, .promo-item, .popular-item, .combo-item")

      if (productElement) {
        const product = {
          id: Date.now() + Math.random(),
          name: productElement.querySelector("h3").textContent,
          description: productElement.querySelector("p").textContent,
          price: Number.parseFloat(productElement.querySelector(".price").textContent.replace("$", "")),
          image: productElement.querySelector("img")?.src || "/placeholder.svg?height=80&width=80",
          customizations: "",
        }

        addToCart(product)
      }
    })
  })
})

// Agregar estilos para la animación
const style = document.createElement("style")
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`
document.head.appendChild(style)
