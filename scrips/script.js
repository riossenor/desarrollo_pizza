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

  // Simulate loading popular pizzas
  const loadPopularPizzas = () => {
    const popularItems = document.querySelectorAll(".popular-item")

    // Sample pizza data (in a real app, this would come from an API)
    const pizzas = [
      { name: "Pepperoni", price: "$129", image: "pizza1.jpg" },
      { name: "Hawaiana", price: "$139", image: "pizza2.jpg" },
      { name: "Mexicana", price: "$149", image: "pizza3.jpg" },
    ]

    popularItems.forEach((item, index) => {
      if (pizzas[index]) {
        const pizza = pizzas[index]

        item.innerHTML = `
                    <div class="pizza-image" style="background-color: #ccc; height: 70%;"></div>
                    <div class="pizza-info" style="padding: 10px;">
                        <h3>${pizza.name}</h3>
                        <p>${pizza.price}</p>
                    </div>
                `
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

  // FAQ buttons functionality
  const faqButtons = document.querySelectorAll(".faq-button")

  faqButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Aquí normalmente mostrarías la respuesta a la pregunta
      alert(`Respuesta a: ${this.textContent}`)
    })
  })
})
