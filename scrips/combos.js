document.addEventListener("DOMContentLoaded", () => {
  // Category tabs functionality
  const categoryTabs = document.querySelectorAll(".category-tab")
  const combosSections = document.querySelectorAll(".combos-section")

  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      categoryTabs.forEach((t) => t.classList.remove("active"))

      // Add active class to clicked tab
      tab.classList.add("active")

      // Hide all combos sections
      combosSections.forEach((section) => section.classList.remove("active"))

      // Show the selected combos section
      const categoryId = tab.getAttribute("data-category")
      document.getElementById(categoryId).classList.add("active")
    })
  })

  // Add to cart functionality for predefined combos
  const addButtons = document.querySelectorAll(".btn-add")

  addButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const comboItem = this.closest(".combo-item")
      const comboName = comboItem.querySelector("h3").textContent
      const comboPrice = comboItem.querySelector(".price").textContent

      // In a real app, you would add the combo to a cart object or send to backend
      console.log(`Added to cart: ${comboName} - ${comboPrice}`)

      // Show confirmation to user
      alert(`¡${comboName} agregado al carrito!`)
    })
  })

  // Create your combo functionality
  const checkboxes = document.querySelectorAll('input[type="checkbox"]')
  const selects = document.querySelectorAll("select")
  const comboItemsList = document.getElementById("combo-items-list")
  const regularPriceElement = document.getElementById("regular-price")
  const discountElement = document.getElementById("discount")
  const totalPriceElement = document.getElementById("total-price")
  const addComboButton = document.querySelector(".btn-add-combo")

  // Price mapping (in a real app, these would come from a database)
  const prices = {
    "pizza-pequena-pepperoni": 99,
    "pizza-pequena-hawaiana": 109,
    "pizza-pequena-mexicana": 119,
    "pizza-pequena-vegetariana": 119,
    "pizza-pequena-suprema": 129,
    "pizza-mediana-pepperoni": 129,
    "pizza-mediana-hawaiana": 139,
    "pizza-mediana-mexicana": 149,
    "pizza-mediana-vegetariana": 149,
    "pizza-mediana-suprema": 159,
    "pizza-grande-pepperoni": 169,
    "pizza-grande-hawaiana": 179,
    "pizza-grande-mexicana": 189,
    "pizza-grande-vegetariana": 189,
    "pizza-grande-suprema": 199,
    papas: 39,
    volovanes: 45,
    hojaldras: 35,
    "refresco-personal": 25,
    "refresco-familiar": 45,
    agua: 20,
    helado: 25,
    pastel: 99,
  }

  // Function to update the combo summary
  const updateComboSummary = () => {
    // Clear the current list
    comboItemsList.innerHTML = ""

    let regularPrice = 0
    let itemCount = 0

    // Check all checkboxes
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const parentOption = checkbox.closest(".combo-option")
        const quantitySelect = parentOption.querySelector(".quantity")
        const quantity = Number.parseInt(quantitySelect.value)

        let itemName = checkbox.parentNode.textContent.trim()
        let itemPrice = 0

        // If it's a pizza, get the type
        if (checkbox.value.includes("pizza")) {
          const typeSelect = parentOption.querySelector(".pizza-type")
          const pizzaType = typeSelect.value

          if (pizzaType) {
            const priceKey = `${checkbox.value}-${pizzaType}`
            itemPrice = prices[priceKey] || 0

            // Get the pizza type text
            const selectedOption = typeSelect.options[typeSelect.selectedIndex]
            itemName = `${itemName} ${selectedOption.text}`
          }
        } else {
          itemPrice = prices[checkbox.value] || 0
        }

        // Multiply by quantity
        const totalItemPrice = itemPrice * quantity

        if (itemPrice > 0) {
          // Add to the list
          const listItem = document.createElement("li")
          listItem.innerHTML = `
            <span>${quantity}x ${itemName}</span>
            <span>$${totalItemPrice.toFixed(2)}</span>
          `
          comboItemsList.appendChild(listItem)

          // Add to regular price
          regularPrice += totalItemPrice
          itemCount += quantity
        }
      }
    })

    // Calculate discount based on number of items
    let discountPercentage = 0
    if (itemCount >= 10) {
      discountPercentage = 0.25 // 25% discount
    } else if (itemCount >= 7) {
      discountPercentage = 0.2 // 20% discount
    } else if (itemCount >= 4) {
      discountPercentage = 0.15 // 15% discount
    } else if (itemCount >= 2) {
      discountPercentage = 0.1 // 10% discount
    }

    const discountAmount = regularPrice * discountPercentage
    const totalPrice = regularPrice - discountAmount

    // Update the price displays
    regularPriceElement.textContent = `$${regularPrice.toFixed(2)}`
    discountElement.textContent = `-$${discountAmount.toFixed(2)}`
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`

    // If no items are selected, show a message
    if (itemCount === 0) {
      comboItemsList.innerHTML = "<li>No hay productos seleccionados</li>"
    }
  }

  // Add event listeners to all checkboxes and selects
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateComboSummary)
  })

  selects.forEach((select) => {
    select.addEventListener("change", updateComboSummary)
  })

  // Add to cart button for custom combo
  addComboButton.addEventListener("click", () => {
    const totalPrice = totalPriceElement.textContent

    // Check if any items are selected
    if (comboItemsList.children.length === 0 || comboItemsList.innerHTML.includes("No hay productos seleccionados")) {
      alert("Por favor selecciona al menos un producto para tu combo")
      return
    }

    // In a real app, you would add the combo to a cart object or send to backend
    console.log(`Added custom combo to cart: ${totalPrice}`)

    // Show confirmation to user
    alert(`¡Combo personalizado agregado al carrito!`)
  })

  // Initialize the summary
  updateComboSummary()
})
