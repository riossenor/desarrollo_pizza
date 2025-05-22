document.addEventListener("DOMContentLoaded", () => {
  // Elementos del DOM
  const sizeInputs = document.querySelectorAll('input[name="size"]')
  const crustInputs = document.querySelectorAll('input[name="crust"]')
  const sauceInputs = document.querySelectorAll('input[name="sauce"]')
  const cheeseInputs = document.querySelectorAll('input[name="cheese"]')
  const extraCheeseInput = document.querySelector('input[name="extra_cheese"]')
  const ingredientInputs = document.querySelectorAll('input[name="ingredient"]')
  const quantityInput = document.getElementById("pizza-quantity")
  const decreaseBtn = document.getElementById("decrease-quantity")
  const increaseBtn = document.getElementById("increase-quantity")
  const addToCartBtn = document.getElementById("add-to-cart")

  // Elementos de resumen
  const summarySize = document.getElementById("summary-size")
  const summaryCrust = document.getElementById("summary-crust")
  const summarySauce = document.getElementById("summary-sauce")
  const summaryCheese = document.getElementById("summary-cheese")
  const summaryIngredients = document.getElementById("summary-ingredients")
  const basePrice = document.getElementById("base-price")
  const extrasPrice = document.getElementById("extras-price")
  const totalPrice = document.getElementById("total-price")

  // Canvas para visualización de pizza
  const canvas = document.getElementById("pizza-builder-canvas")
  const ctx = canvas.getContext("2d")

  // Precios base por tamaño
  const sizePrices = {
    small: 99,
    medium: 149,
    large: 199,
  }

  // Extras
  const extraPrices = {
    stuffed: 20,
    extra_cheese: 15,
    extra_ingredient: 10,
  }

  // Estado actual de la pizza
  const currentPizza = {
    size: "small",
    crust: "traditional",
    sauce: "tomato",
    cheese: "mozzarella",
    extraCheese: false,
    extraCheeseAmount: "normal", // light, normal, extra
    ingredients: [],
    ingredientAmounts: {}, // Almacena la cantidad de cada ingrediente (light, normal, extra)
    quantity: 1,
  }

  // Imágenes para la visualización
  const pizzaImages = {
    crusts: {
      traditional: "/placeholder.svg?height=300&width=300",
      thin: "/placeholder.svg?height=300&width=300",
      thick: "/placeholder.svg?height=300&width=300",
      stuffed: "/placeholder.svg?height=300&width=300",
    },
    sauces: {
      tomato: "#ff6347",
      bbq: "#8b4513",
      white: "#fffff0",
      pesto: "#556b2f",
    },
    cheeses: {
      mozzarella: "#fffff0",
      cheddar: "#ffa500",
      gouda: "#ffdeae",
      parmesan: "#f5f5dc",
    },
    ingredients: {
      pepperoni: "#8B0000",
      ham: "#FFC0CB",
      bacon: "#CD5C5C",
      sausage: "#A52A2A",
      chicken: "#F5DEB3",
      beef: "#8B4513",
      mushrooms: "#D2B48C",
      onions: "#FFFFFF",
      peppers: "#228B22",
      olives: "#000000",
      pineapple: "#FFD700",
      tomatoes: "#FF6347",
      corn: "#FFFF00",
      jalapenos: "#006400",
      spinach: "#006400",
    },
  }

  // Función para dibujar la pizza en el canvas
  function drawPizza() {
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Dibujar la masa
    drawCrust()

    // Dibujar la salsa
    drawSauce()

    // Dibujar el queso
    drawCheese()

    // Dibujar los ingredientes
    drawIngredients()
  }

  // Dibujar la masa de la pizza
  function drawCrust() {
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    let radius

    // Ajustar el tamaño según la selección
    switch (currentPizza.size) {
      case "small":
        radius = canvas.width * 0.35
        break
      case "medium":
        radius = canvas.width * 0.4
        break
      case "large":
        radius = canvas.width * 0.45
        break
    }

    // Dibujar el círculo de la masa
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.fillStyle = "#F5DEB3" // Color base de la masa
    ctx.fill()

    // Dibujar el borde
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.lineWidth = currentPizza.crust === "stuffed" ? 15 : 8
    ctx.strokeStyle = "#D2B48C" // Color del borde
    ctx.stroke()

    // Si es masa con borde relleno, agregar efecto visual
    if (currentPizza.crust === "stuffed") {
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius - 8, 0, Math.PI * 2)
      ctx.lineWidth = 2
      ctx.strokeStyle = "#FFD700" // Color amarillo para el queso en el borde
      ctx.stroke()
    }
  }

  // Dibujar la salsa
  function drawSauce() {
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    let radius

    // Ajustar el tamaño según la selección
    switch (currentPizza.size) {
      case "small":
        radius = canvas.width * 0.33
        break
      case "medium":
        radius = canvas.width * 0.38
        break
      case "large":
        radius = canvas.width * 0.43
        break
    }

    // Dibujar el círculo de la salsa
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.fillStyle = pizzaImages.sauces[currentPizza.sauce]
    ctx.globalAlpha = 0.7 // Hacer la salsa semi-transparente
    ctx.fill()
    ctx.globalAlpha = 1.0 // Restaurar opacidad
  }

  // Dibujar el queso
  function drawCheese() {
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    let radius

    // Ajustar el tamaño según la selección
    switch (currentPizza.size) {
      case "small":
        radius = canvas.width * 0.32
        break
      case "medium":
        radius = canvas.width * 0.37
        break
      case "large":
        radius = canvas.width * 0.42
        break
    }

    // Dibujar el círculo del queso base
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.fillStyle = pizzaImages.cheeses[currentPizza.cheese]

    // Ajustar opacidad según la cantidad de queso
    if (currentPizza.extraCheese) {
      switch (currentPizza.extraCheeseAmount) {
        case "light":
          ctx.globalAlpha = 0.4
          break
        case "normal":
          ctx.globalAlpha = 0.7
          break
        case "extra":
          ctx.globalAlpha = 0.9
          break
      }
    } else {
      ctx.globalAlpha = 0.5
    }

    ctx.fill()
    ctx.globalAlpha = 1.0 // Restaurar opacidad

    // Si es queso extra, agregar efecto visual adicional
    if (currentPizza.extraCheese && currentPizza.extraCheeseAmount === "extra") {
      // Dibujar "hilos" de queso
      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * radius * 0.8
        const x = centerX + Math.cos(angle) * distance
        const y = centerY + Math.sin(angle) * distance

        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = pizzaImages.cheeses[currentPizza.cheese]
        ctx.fill()
      }
    }
  }

  // Dibujar los ingredientes
  function drawIngredients() {
    if (currentPizza.ingredients.length === 0) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    let radius

    // Ajustar el tamaño según la selección
    switch (currentPizza.size) {
      case "small":
        radius = canvas.width * 0.3
        break
      case "medium":
        radius = canvas.width * 0.35
        break
      case "large":
        radius = canvas.width * 0.4
        break
    }

    // Dibujar cada ingrediente
    currentPizza.ingredients.forEach((ingredient) => {
      const amount = currentPizza.ingredientAmounts[ingredient] || "normal"
      let count

      // Determinar cuántos elementos dibujar según la cantidad
      switch (amount) {
        case "light":
          count = 5
          break
        case "normal":
          count = 12
          break
        case "extra":
          count = 20
          break
      }

      // Dibujar los elementos del ingrediente
      for (let i = 0; i < count; i++) {
        // Posición aleatoria dentro de la pizza
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * radius * 0.9
        const x = centerX + Math.cos(angle) * distance
        const y = centerY + Math.sin(angle) * distance

        // Tamaño aleatorio para variedad
        const size = 3 + Math.random() * 5

        // Dibujar el ingrediente
        ctx.beginPath()

        // Formas diferentes según el ingrediente
        if (ingredient === "pepperoni" || ingredient === "tomatoes" || ingredient === "olives") {
          // Círculos para pepperoni, tomates y aceitunas
          ctx.arc(x, y, size, 0, Math.PI * 2)
        } else if (ingredient === "pineapple" || ingredient === "ham") {
          // Cuadrados para piña y jamón
          ctx.rect(x - size / 2, y - size / 2, size, size)
        } else if (ingredient === "peppers" || ingredient === "jalapenos") {
          // Formas alargadas para pimientos y jalapeños
          ctx.ellipse(x, y, size / 2, size, Math.random() * Math.PI, 0, Math.PI * 2)
        } else {
          // Formas irregulares para otros ingredientes
          ctx.moveTo(x, y - size / 2)
          for (let j = 0; j < 5; j++) {
            const angle = (j * 2 * Math.PI) / 5 - Math.PI / 2
            const px = x + Math.cos(angle) * size
            const py = y + Math.sin(angle) * size
            ctx.lineTo(px, py)
          }
          ctx.closePath()
        }

        ctx.fillStyle = pizzaImages.ingredients[ingredient]
        ctx.fill()

        // Agregar contorno para mejor visibilidad
        ctx.strokeStyle = "rgba(0,0,0,0.3)"
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    })
  }

  // Función para actualizar la visualización de la pizza
  function updatePizzaVisualization() {
    drawPizza()
  }

  // Función para actualizar el resumen de la pizza
  function updatePizzaSummary() {
    // Actualizar texto del resumen
    summarySize.textContent = getSizeName(currentPizza.size)
    summaryCrust.textContent = getCrustName(currentPizza.crust)
    summarySauce.textContent = getSauceName(currentPizza.sauce)

    let cheeseText = getCheeseName(currentPizza.cheese)
    if (currentPizza.extraCheese) {
      const amountText =
        currentPizza.extraCheeseAmount === "light"
          ? "Ligero"
          : currentPizza.extraCheeseAmount === "extra"
            ? "Extra"
            : "Normal"
      cheeseText += ` (${amountText})`
    }
    summaryCheese.textContent = cheeseText

    if (currentPizza.ingredients.length > 0) {
      const ingredientTexts = currentPizza.ingredients.map((ing) => {
        const name = getIngredientName(ing)
        const amount = currentPizza.ingredientAmounts[ing] || "normal"
        const amountText = amount === "light" ? " (Ligero)" : amount === "extra" ? " (Extra)" : ""
        return name + amountText
      })
      summaryIngredients.textContent = ingredientTexts.join(", ")
    } else {
      summaryIngredients.textContent = "Ninguno seleccionado"
    }

    // Calcular precios
    const basePriceValue = sizePrices[currentPizza.size]
    let extrasPriceValue = 0

    // Agregar precio por masa con borde relleno
    if (currentPizza.crust === "stuffed") {
      extrasPriceValue += extraPrices.stuffed
    }

    // Agregar precio por queso extra
    if (currentPizza.extraCheese) {
      const multiplier =
        currentPizza.extraCheeseAmount === "light" ? 0.5 : currentPizza.extraCheeseAmount === "extra" ? 1.5 : 1
      extrasPriceValue += extraPrices.extra_cheese * multiplier
    }

    // Agregar precio por ingredientes extra (los primeros 3 son gratis)
    if (currentPizza.ingredients.length > 3) {
      let ingredientCost = 0
      currentPizza.ingredients.slice(3).forEach((ing) => {
        const amount = currentPizza.ingredientAmounts[ing] || "normal"
        const multiplier = amount === "light" ? 0.5 : amount === "extra" ? 1.5 : 1
        ingredientCost += extraPrices.extra_ingredient * multiplier
      })
      extrasPriceValue += ingredientCost
    }

    // Actualizar precios en el resumen
    basePrice.textContent = `$${basePriceValue.toFixed(2)}`
    extrasPrice.textContent = `$${extrasPriceValue.toFixed(2)}`

    const total = (basePriceValue + extrasPriceValue) * currentPizza.quantity
    totalPrice.textContent = `$${total.toFixed(2)}`
  }

  // Funciones auxiliares para obtener nombres
  function getSizeName(size) {
    switch (size) {
      case "small":
        return "Pequeña"
      case "medium":
        return "Mediana"
      case "large":
        return "Grande"
      default:
        return ""
    }
  }

  function getCrustName(crust) {
    switch (crust) {
      case "traditional":
        return "Tradicional"
      case "thin":
        return "Delgada"
      case "thick":
        return "Gruesa"
      case "stuffed":
        return "Borde Relleno"
      default:
        return ""
    }
  }

  function getSauceName(sauce) {
    switch (sauce) {
      case "tomato":
        return "Tomate"
      case "bbq":
        return "BBQ"
      case "white":
        return "Blanca"
      case "pesto":
        return "Pesto"
      default:
        return ""
    }
  }

  function getCheeseName(cheese) {
    switch (cheese) {
      case "mozzarella":
        return "Mozzarella"
      case "cheddar":
        return "Cheddar"
      case "gouda":
        return "Gouda"
      case "parmesan":
        return "Parmesano"
      default:
        return ""
    }
  }

  function getIngredientName(ingredient) {
    switch (ingredient) {
      case "pepperoni":
        return "Pepperoni"
      case "ham":
        return "Jamón"
      case "bacon":
        return "Tocino"
      case "sausage":
        return "Salchicha"
      case "chicken":
        return "Pollo"
      case "beef":
        return "Carne"
      case "mushrooms":
        return "Champiñones"
      case "onions":
        return "Cebolla"
      case "peppers":
        return "Pimientos"
      case "olives":
        return "Aceitunas"
      case "pineapple":
        return "Piña"
      case "tomatoes":
        return "Tomate"
      case "corn":
        return "Maíz"
      case "jalapenos":
        return "Jalapeños"
      case "spinach":
        return "Espinacas"
      default:
        return ""
    }
  }

  // Función para manejar los cambios en la cantidad de ingredientes
  function handleIngredientAmount(ingredient, action) {
    const currentAmount = currentPizza.ingredientAmounts[ingredient] || "normal"

    if (action === "more") {
      if (currentAmount === "light") {
        currentPizza.ingredientAmounts[ingredient] = "normal"
      } else if (currentAmount === "normal") {
        currentPizza.ingredientAmounts[ingredient] = "extra"
      }
    } else if (action === "less") {
      if (currentAmount === "extra") {
        currentPizza.ingredientAmounts[ingredient] = "normal"
      } else if (currentAmount === "normal") {
        currentPizza.ingredientAmounts[ingredient] = "light"
      }
    }

    updatePizzaVisualization()
    updatePizzaSummary()
    updateAmountText(ingredient)
  }

  // Función para manejar los cambios en la cantidad de queso extra
  function handleCheeseAmount(action) {
    if (action === "more") {
      if (currentPizza.extraCheeseAmount === "light") {
        currentPizza.extraCheeseAmount = "normal"
      } else if (currentPizza.extraCheeseAmount === "normal") {
        currentPizza.extraCheeseAmount = "extra"
      }
    } else if (action === "less") {
      if (currentPizza.extraCheeseAmount === "extra") {
        currentPizza.extraCheeseAmount = "normal"
      } else if (currentPizza.extraCheeseAmount === "normal") {
        currentPizza.extraCheeseAmount = "light"
      }
    }

    updatePizzaVisualization()
    updatePizzaSummary()

    // Actualizar texto de cantidad
    const cheeseOption = extraCheeseInput.closest(".cheese-option")
    const amountText = cheeseOption.querySelector(".amount-text")

    if (amountText) {
      if (currentPizza.extraCheeseAmount === "light") {
        amountText.textContent = "Ligero"
        cheeseOption.classList.add("amount-light")
        cheeseOption.classList.remove("amount-extra")
      } else if (currentPizza.extraCheeseAmount === "extra") {
        amountText.textContent = "Extra"
        cheeseOption.classList.remove("amount-light")
        cheeseOption.classList.add("amount-extra")
      } else {
        amountText.textContent = "Normal"
        cheeseOption.classList.remove("amount-light", "amount-extra")
      }
    }
  }

  // Función para actualizar el texto de cantidad de un ingrediente
  function updateAmountText(ingredient) {
    const ingredientOption = Array.from(ingredientInputs)
      .find((input) => input.value === ingredient)
      .closest(".ingredient-option")
    const amountText = ingredientOption.querySelector(".amount-text")
    const amount = currentPizza.ingredientAmounts[ingredient] || "normal"

    if (amountText) {
      if (amount === "light") {
        amountText.textContent = "Ligero"
        ingredientOption.classList.add("amount-light")
        ingredientOption.classList.remove("amount-extra")
      } else if (amount === "extra") {
        amountText.textContent = "Extra"
        ingredientOption.classList.remove("amount-light")
        ingredientOption.classList.add("amount-extra")
      } else {
        amountText.textContent = "Normal"
        ingredientOption.classList.remove("amount-light", "amount-extra")
      }
    }
  }

  // Event listeners para cambios en las opciones
  sizeInputs.forEach((input) => {
    input.addEventListener("change", function () {
      currentPizza.size = this.value
      updatePizzaVisualization()
      updatePizzaSummary()
    })
  })

  crustInputs.forEach((input) => {
    input.addEventListener("change", function () {
      currentPizza.crust = this.value
      updatePizzaVisualization()
      updatePizzaSummary()
    })
  })

  sauceInputs.forEach((input) => {
    input.addEventListener("change", function () {
      currentPizza.sauce = this.value
      updatePizzaVisualization()
      updatePizzaSummary()
    })
  })

  cheeseInputs.forEach((input) => {
    input.addEventListener("change", function () {
      currentPizza.cheese = this.value
      updatePizzaVisualization()
      updatePizzaSummary()
    })
  })

  extraCheeseInput.addEventListener("change", function () {
    currentPizza.extraCheese = this.checked
    updatePizzaVisualization()
    updatePizzaSummary()

    // Mostrar/ocultar controles de cantidad
    const amountControls = this.closest(".cheese-option").querySelector(".ingredient-amount")
    if (amountControls) {
      amountControls.style.display = this.checked ? "flex" : "none"
    }
  })

  // Manejar selección de ingredientes (máximo 5)
  ingredientInputs.forEach((input) => {
    input.addEventListener("change", function () {
      if (this.checked) {
        // Verificar si ya hay 5 ingredientes seleccionados
        if (currentPizza.ingredients.length >= 5) {
          alert("Solo puedes seleccionar hasta 5 ingredientes")
          this.checked = false
          return
        }

        currentPizza.ingredients.push(this.value)
        currentPizza.ingredientAmounts[this.value] = "normal"

        // Mostrar controles de cantidad
        const amountControls = this.closest(".ingredient-option").querySelector(".ingredient-amount")
        if (amountControls) {
          amountControls.style.display = "flex"
        }
      } else {
        // Remover ingrediente de la lista
        const index = currentPizza.ingredients.indexOf(this.value)
        if (index !== -1) {
          currentPizza.ingredients.splice(index, 1)
          delete currentPizza.ingredientAmounts[this.value]
        }

        // Ocultar controles de cantidad
        const amountControls = this.closest(".ingredient-option").querySelector(".ingredient-amount")
        if (amountControls) {
          amountControls.style.display = "none"
        }
      }

      updatePizzaVisualization()
      updatePizzaSummary()
    })
  })

  // Agregar event listeners para los botones de cantidad
  document.querySelectorAll(".amount-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const action = this.getAttribute("data-action")
      const parent = this.closest(".ingredient-option, .cheese-option")

      if (parent.classList.contains("cheese-option")) {
        // Es el queso extra
        handleCheeseAmount(action)
      } else {
        // Es un ingrediente
        const input = parent.querySelector('input[name="ingredient"]')
        if (input && input.checked) {
          handleIngredientAmount(input.value, action)
        }
      }
    })
  })

  // Manejar cambios en la cantidad
  decreaseBtn.addEventListener("click", () => {
    if (currentPizza.quantity > 1) {
      currentPizza.quantity--
      quantityInput.value = currentPizza.quantity
      updatePizzaSummary()
    }
  })

  increaseBtn.addEventListener("click", () => {
    if (currentPizza.quantity < 10) {
      currentPizza.quantity++
      quantityInput.value = currentPizza.quantity
      updatePizzaSummary()
    }
  })

  quantityInput.addEventListener("change", function () {
    const value = Number.parseInt(this.value)
    if (isNaN(value) || value < 1) {
      this.value = 1
      currentPizza.quantity = 1
    } else if (value > 10) {
      this.value = 10
      currentPizza.quantity = 10
    } else {
      currentPizza.quantity = value
    }

    updatePizzaSummary()
  })

  // Manejar clic en el botón de agregar al carrito
  addToCartBtn.addEventListener("click", () => {
    // Crear un objeto con la información de la pizza
    const pizzaOrder = {
      ...currentPizza,
    }

    // En una aplicación real, aquí enviaríamos la información al carrito
    console.log("Pizza agregada al carrito:", pizzaOrder)

    // Mostrar mensaje de confirmación
    alert("¡Pizza agregada al carrito!")
  })

  // Inicializar la visualización y el resumen
  updatePizzaVisualization()
  updatePizzaSummary()

  // Ocultar inicialmente todos los controles de cantidad
  document.querySelectorAll(".ingredient-amount").forEach((control) => {
    control.style.display = "none"
  })
})
