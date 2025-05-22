document.addEventListener("DOMContentLoaded", () => {
  // Category tabs functionality
  const categoryTabs = document.querySelectorAll(".category-tab")
  const promosSections = document.querySelectorAll(".promos-section")

  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      categoryTabs.forEach((t) => t.classList.remove("active"))

      // Add active class to clicked tab
      tab.classList.add("active")

      // Hide all promos sections
      promosSections.forEach((section) => section.classList.remove("active"))

      // Show the selected promos section
      const categoryId = tab.getAttribute("data-category")
      document.getElementById(categoryId).classList.add("active")
    })
  })

  // Countdown timer functionality
  const countdownElement = document.getElementById("countdown")

  if (countdownElement) {
    let hours = 5
    let minutes = 59
    let seconds = 59

    const updateCountdown = () => {
      countdownElement.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

      seconds--

      if (seconds < 0) {
        seconds = 59
        minutes--

        if (minutes < 0) {
          minutes = 59
          hours--

          if (hours < 0) {
            // Reset the countdown when it reaches zero
            hours = 5
            minutes = 59
            seconds = 59
          }
        }
      }
    }

    // Update the countdown every second
    setInterval(updateCountdown, 1000)

    // Initial update
    updateCountdown()
  }

  // Add to cart functionality
  const addButtons = document.querySelectorAll(".btn-add")

  addButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const promoItem = this.closest(".promo-item") || this.closest(".evento-item")
      const promoName = promoItem.querySelector("h3").textContent
      const promoPrice = promoItem.querySelector(".price")
        ? promoItem.querySelector(".price").textContent
        : "Evento Especial"

      // In a real app, you would add the promo to a cart object or send to backend
      console.log(`Added to cart: ${promoName} - ${promoPrice}`)

      // Show confirmation to user
      alert(`¡${promoName} agregado al carrito!`)
    })
  })
})
