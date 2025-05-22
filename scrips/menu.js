document.addEventListener("DOMContentLoaded", () => {
  // Category tabs functionality
  const categoryTabs = document.querySelectorAll(".category-tab")
  const menuSections = document.querySelectorAll(".menu-section")

  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      categoryTabs.forEach((t) => t.classList.remove("active"))

      // Add active class to clicked tab
      tab.classList.add("active")

      // Hide all menu sections
      menuSections.forEach((section) => section.classList.remove("active"))

      // Show the selected menu section
      const categoryId = tab.getAttribute("data-category")
      document.getElementById(categoryId).classList.add("active")
    })
  })

  // Pizza size selector functionality
  const sizeBtns = document.querySelectorAll(".size-btn")

  sizeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all size buttons
      sizeBtns.forEach((b) => b.classList.remove("active"))

      // Add active class to clicked button
      btn.classList.add("active")

      // Get selected size
      const selectedSize = btn.getAttribute("data-size")

      // Update prices based on selected size
      const pizzaSection = document.getElementById("pizzas")
      const prices = pizzaSection.querySelectorAll(".price")

      prices.forEach((price) => {
        // Hide all prices first
        price.classList.add("hidden")

        // Show only the prices for the selected size
        if (price.getAttribute("data-size") === selectedSize) {
          price.classList.remove("hidden")
        }
      })
    })
  })

  // Add to cart functionality
  const addButtons = document.querySelectorAll(".btn-add")

  addButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const menuItem = this.closest(".menu-item")
      const itemName = menuItem.querySelector("h3").textContent
      const itemPrice = menuItem.querySelector(".price:not(.hidden)").textContent

      // In a real app, you would add the item to a cart object or send to backend
      console.log(`Added to cart: ${itemName} - ${itemPrice}`)

      // Show confirmation to user
      alert(`¡${itemName} agregado al carrito!`)
    })
  })
})
