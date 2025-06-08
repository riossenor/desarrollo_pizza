document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const createMobileMenu = () => {
    const header = document.querySelector("header")
    const nav = document.querySelector(".main-nav")

    const mobileMenuBtn = document.createElement("button")
    mobileMenuBtn.classList.add("mobile-menu-btn")
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'

    if (header.contains(nav)) {
      header.insertBefore(mobileMenuBtn, nav)
    } else {
      header.insertBefore(mobileMenuBtn, header.firstChild) // o header.appendChild(...)
    }

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
  function loadPromotions() {
    const promoItems = document.querySelectorAll(".promo-item")
    const promotions = [
      {
        name: "Combo Celebración",
        description: "Pizza + Palitos de pan + Pastel + Refresco",
        price: "$199.00",
        image: "recursos/promo1.png",
      },
      {
        name: "Combo Familia",
        description: "1 Pizza Grande + 1 Pizza Mediana Dulce + Refresco 1.5L",
        price: "$249.00",
        image: "recursos/promo2.jpeg",
      },
      {
        name: "2x1 en Pizzas Medianas",
        description: "Para recoger y a domicilio",
        price: "$159.00",
        image: "recursos/promo3.png",
      },
    ]

    promoItems.forEach((item, index) => {
      const promo = promotions[index]
      if (promo) {
        item.querySelector("img").src = promo.image
        item.querySelector("h3").textContent = promo.name
        item.querySelector("p").textContent = promo.description
        item.querySelector(".price").textContent = promo.price
      }
    })
  }

  // Simulate loading popular pizzas
  function loadPopularPizzas() {
    const popularItems = document.querySelectorAll(".popular-item")
    const pizzas = [
      {
        name: "Pizza Mexicana",
        description: "Chorizo, pimientos, aceitunas negras y queso",
        price: "$149.00",
        image: "recursos/pizza-mexicana.jpeg",
      },
      {
        name: "Pizza Hawaiana",
        description: "Jamón, piña y queso mozzarella",
        price: "$139.00",
        image: "recursos/pizza-hawaiana.jpeg",
      },
      {
        name: "Pizza Pepperoni",
        description: "Pepperoni y queso mozzarella",
        price: "$129.00",
        image: "recursos/pizza-pepperoni.jpeg",
      },
    ]

    popularItems.forEach((item, index) => {
      const pizza = pizzas[index]
      if (pizza) {
        item.querySelector("img").src = pizza.image
        item.querySelector("h3").textContent = pizza.name
        item.querySelector("p").textContent = pizza.description
        item.querySelector(".price").textContent = pizza.price
      }
    })
  }

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

  // FAQ Modal functionality
  const faqData = {
    "¿Cuánto tiempo tarda la entrega?": {
      title: "Tiempo de entrega",
      content: `
      <p><strong>Tiempo estimado de entrega:</strong></p>
      <ul>
        <li><strong>Recoger en tienda:</strong> 15-25 minutos</li>
        <li><strong>Entrega a domicilio:</strong> 30-45 minutos</li>
        <li><strong>Horarios pico (viernes-domingo):</strong> 45-60 minutos</li>
      </ul>
      <p>Te enviaremos notificaciones por SMS sobre el estado de tu pedido.</p>
    `,
    },
    "¿Cómo puedo pagar mi pedido?": {
      title: "Métodos de pago",
      content: `
      <p><strong>Aceptamos los siguientes métodos de pago:</strong></p>
      <ul>
        <li><strong>Efectivo:</strong> Al momento de la entrega o recolección</li>
        <li><strong>Tarjetas:</strong> Visa, MasterCard, American Express</li>
        <li><strong>Transferencia bancaria:</strong> Con comprobante de pago</li>
      </ul>
      <p>Todos los pagos son seguros y protegidos.</p>
    `,
    },
    "¿Puedo modificar mi pedido?": {
      title: "Modificación de pedidos",
      content: `
      <p><strong>Modificaciones de pedido:</strong></p>
      <ul>
        <li>Puedes modificar tu pedido <strong>hasta 5 minutos</strong> después de confirmarlo</li>
        <li>Llama al <strong>+123 456 789 0123</strong> para solicitar cambios</li>
        <li>Una vez que el pedido esté en preparación, no se pueden hacer cambios</li>
      </ul>
      <p>Para cancelaciones, aplican términos y condiciones específicos.</p>
    `,
    },
    "¿Tienen opciones vegetarianas?": {
      title: "Opciones vegetarianas",
      content: `
      <p><strong>¡Sí! Tenemos varias opciones vegetarianas:</strong></p>
      <ul>
        <li><strong>Contamos con diferentes ingredientes para personas vegetarianas</li>
        <li><strong>Tambien contamos con una Pizza Vegetariana que incluye:  Champiñones, pimientos, cebolla, aceitunas</li>
      </ul>
      <p>Todos nuestros ingredientes vegetarianos son frescos y de alta calidad.</p>
    `,
    },
    "¿Cuál es el pedido mínimo?": {
      title: "Pedido mínimo",
      content: `
      <p><strong>Información sobre pedidos mínimos:</strong></p>
      <ul>
        <li><strong>Recoger en tienda:</strong> Sin pedido mínimo</li>
        <li><strong>Entrega a domicilio:</strong> $150 pesos mínimo</li>
        <li><strong>Envío gratis:</strong> En pedidos mayores a $300 pesos</li>
      </ul>
      <p>Los precios pueden variar según la zona de entrega.</p>
    `,
    },
    "¿Cómo crear una cuenta?": {
      title: "Crear cuenta",
      content: `
      <p><strong>Pasos para crear tu cuenta:</strong></p>
      <ol>
        <li>Haz clic en <strong>"Entrar"</strong> en la parte superior</li>
        <li>Selecciona la pestaña <strong>"Registrarse"</strong></li>
        <li>Completa todos los campos requeridos</li>
        <li>Acepta los términos y condiciones</li>
        <li>Haz clic en <strong>"Registrarse"</strong></li>
      </ol>
      <p>Con tu cuenta podrás guardar direcciones, ver historial de pedidos y recibir ofertas exclusivas.</p>
    `,
    },
    "¿Tienen promociones especiales?": {
      title: "Promociones especiales",
      content: `
      <p><strong>¡Sí! Tenemos promociones constantes:</strong></p>
      <ul>
        <li><strong>Combos en promocion:</strong>  Combo Familia, Combo Celebracion, 2x1 en Pizzas medianas y Combo Amigos</li>
        <li><strong>Pizzas en promocion:</strong> Pizza Hawaiana Grande, Pizza Mexicana Grande, Pizza Suprema Grande y Pizza 4 Quesos Grande</li>
        <li><strong>Eventos:</strong> Martes de helado Gratis, Miércoles 2x1 en Pizzas, Jueves de Buffet Libre y 
Domingo Familiar</li>
      </ul>
      <p>Síguenos en redes sociales para no perderte ninguna promoción.</p>
    `,
    },
    "¿Qué hago si mi pedido llega incompleto?": {
      title: "Pedido incompleto",
      content: `
      <p><strong>Si tu pedido llega incompleto:</strong></p>
      <ol>
        <li><strong>Contacta inmediatamente</strong> al +123 456 789 0123</li>
        <li>Proporciona tu <strong>número de pedido</strong></li>
        <li>Describe qué productos faltan</li>
        <li>Te enviaremos los productos faltantes <strong>sin costo adicional</strong></li>
      </ol>
      <p>También puedes reportar el problema a través de nuestro correo: ayuda@pizzadelivery.com</p>
    `,
    },
  }

  // Create FAQ modal
  function createFAQModal() {
    const modal = document.createElement("div")
    modal.id = "faq-modal"
    modal.className = "faq-modal"
    modal.innerHTML = `
    <div class="faq-modal-content">
      <div class="faq-modal-header">
        <h3 id="faq-modal-title">Pregunta</h3>
        <button class="faq-close-btn" id="faq-close-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="faq-modal-body" id="faq-modal-body">
        <p>Contenido de la respuesta...</p>
      </div>
      <div class="faq-modal-footer">
        <button class="btn-primary" id="faq-accept-btn">Aceptar</button>
      </div>
    </div>
  `

    document.body.appendChild(modal)

    // Add event listeners
    const closeBtn = document.getElementById("faq-close-btn")
    const acceptBtn = document.getElementById("faq-accept-btn")

    closeBtn.addEventListener("click", closeFAQModal)
    acceptBtn.addEventListener("click", closeFAQModal)

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeFAQModal()
      }
    })
  }

  // Show FAQ modal
  function showFAQModal(question) {
    const modal = document.getElementById("faq-modal")
    const title = document.getElementById("faq-modal-title")
    const body = document.getElementById("faq-modal-body")

    const faqItem = faqData[question]

    if (faqItem) {
      title.textContent = faqItem.title
      body.innerHTML = faqItem.content
    } else {
      title.textContent = "Información no disponible"
      body.innerHTML =
        "<p>Lo sentimos, esta información no está disponible en este momento. Por favor contacta a nuestro servicio al cliente.</p>"
    }

    modal.classList.add("show")
    document.body.style.overflow = "hidden" // Prevent background scrolling
  }

  // Close FAQ modal
  function closeFAQModal() {
    const modal = document.getElementById("faq-modal")
    modal.classList.remove("show")
    document.body.style.overflow = "auto" // Restore scrolling
  }

  // Initialize FAQ functionality
  function initializeFAQ() {
    // Create modal if it doesn't exist
    if (!document.getElementById("faq-modal")) {
      createFAQModal()
    }

    // Add event listeners to FAQ buttons
    const faqButtons = document.querySelectorAll(".faq-button")
    faqButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const question = this.textContent.trim()
        showFAQModal(question)
      })
    })
  }

  // Initialize FAQ when page loads
  initializeFAQ()
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

// Add FAQ modal styles
const faqModalStyles = `
  .faq-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2000;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .faq-modal.show {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
  }
  
  .faq-modal-content {
    background: white;
    border-radius: 12px;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    transform: scale(0.9);
    transition: transform 0.3s ease;
  }
  
  .faq-modal.show .faq-modal-content {
    transform: scale(1);
  }
  
  .faq-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 25px;
    border-bottom: 1px solid #eee;
    background-color: #f8f9fa;
    border-radius: 12px 12px 0 0;
  }
  
  .faq-modal-header h3 {
    margin: 0;
    color: #333;
    font-size: 1.3rem;
  }
  
  .faq-close-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    color: #666;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    transition: background-color 0.2s;
  }
  
  .faq-close-btn:hover {
    background-color: #e9ecef;
    color: #333;
  }
  
  .faq-modal-body {
    padding: 25px;
    line-height: 1.6;
  }
  
  .faq-modal-body h4 {
    color: #333;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  .faq-modal-body ul, .faq-modal-body ol {
    margin: 15px 0;
    padding-left: 20px;
  }
  
  .faq-modal-body li {
    margin-bottom: 8px;
  }
  
  .faq-modal-body strong {
    color: #d32f2f;
  }
  
  .faq-modal-footer {
    padding: 15px 25px;
    border-top: 1px solid #eee;
    text-align: right;
    background-color: #f8f9fa;
    border-radius: 0 0 12px 12px;
  }
  
  .faq-modal-footer .btn-primary {
    background-color: #d32f2f;
    color: white;
    border: none;
    padding: 10px 25px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s;
  }
  
  .faq-modal-footer .btn-primary:hover {
    background-color: #b71c1c;
  }
  
  @media (max-width: 768px) {
    .faq-modal-content {
      width: 95%;
      margin: 20px;
    }
    
    .faq-modal-header,
    .faq-modal-body,
    .faq-modal-footer {
      padding: 15px 20px;
    }
  }
`

// Add styles to document
const styleSheet = document.createElement("style")
styleSheet.textContent = faqModalStyles
document.head.appendChild(styleSheet)
