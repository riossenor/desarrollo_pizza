document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = Boolean(window.usuarioId)

  // Elementos del DOM
  const cartItemsContainer = document.getElementById("cart-items")
  const emptyCartContainer = document.getElementById("empty-cart")
  const deliveryTabs = document.querySelectorAll(".delivery-tab")
  const deliveryInfos = document.querySelectorAll(".delivery-info")
  const paymentOptions = document.querySelectorAll('input[name="payment"]')
  const paymentInfos = document.querySelectorAll(".payment-info")
  const checkoutBtn = document.getElementById("checkout-btn")
  const clearCartBtn = document.getElementById("clear-cart")
  const applyPromoBtn = document.getElementById("apply-promo")
  const promoCodeInput = document.getElementById("promo-code-input")
  const promoMessage = document.getElementById("promo-message")
  const cashAmountInput = document.getElementById("cash-amount")
  const changeAmountSpan = document.getElementById("change-amount")
  const orderModal = document.getElementById("order-modal")
  const closeModal = document.querySelector(".close")

  // Elementos de resumen
  const subtotalElement = document.getElementById("subtotal")
  const discountsElement = document.getElementById("discounts")
  const deliveryFeeElement = document.getElementById("delivery-fee")
  const deliveryFeeLine = document.querySelector(".summary-line.delivery-fee")
  const taxElement = document.getElementById("tax")
  const totalElement = document.getElementById("total")

  // Estado del carrito
  let cart = []
  let currentDeliveryMethod = "pickup"
  let appliedPromo = null
  let deliveryFee = 0

  cargarCarritoDesdeServidor()

  // Códigos de descuento válidos
  const promoCodes = {
    DESCUENTO10: { type: "percentage", value: 10, description: "10% de descuento" },
    PIZZA20: { type: "fixed", value: 20, description: "$20 de descuento" },
    ENVIOGRATIS: { type: "free_delivery", value: 0, description: "Envío gratis" },
    NUEVOCLIENTE: { type: "percentage", value: 15, description: "15% de descuento para nuevos clientes" },
  }

  function initializeCart() {
    const local = localStorage.getItem("carrito")
    cart = local ? JSON.parse(local) : []
    renderCart()
    updateSummary()
  }

  function guardarCarritoEnServidor() {
    if (!isLoggedIn) return

    fetch("guardar_carrito.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ carrito: cart })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log("Carrito guardado exitosamente en el servidor")
        } else {
          console.error("Error al guardar el carrito:", data.message)
        }
      })
      .catch(err => console.error("Error en fetch:", err))
  }

  function cargarCarritoDesdeServidor() {
    if (!isLoggedIn) {
      initializeCart()
      return
    }

    fetch("obtener_carrito.php")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          cart = data.carrito
          renderCart()
          updateSummary()
        } else {
          console.warn("No se pudo obtener el carrito:", data.message)
          initializeCart()
        }
      })
      .catch(err => {
        console.error("Error al cargar carrito:", err)
        initializeCart()
      })
  }

  function agregarAlCarrito(producto) {
    cart.push(producto)
    renderCart()
    updateSummary()
    guardarEnLocalStorage()
    guardarCarritoEnServidor()
  }
  
  function guardarEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(cart));
  }

  // Detectar botones "Agregar al carrito" en cualquier página
  document.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', function () {
      // Buscar el contenedor del producto
      const item = this.closest('.promo-item, .popular-item');
      if (!item) return;

      // Obtener datos del producto (ajusta los selectores según tu HTML)
      const name = item.querySelector('h3')?.textContent || 'Producto';
      const priceText = item.querySelector('.price')?.textContent || '$0';
      const price = parseFloat(priceText.replace('$', ''));
      const image = item.querySelector('img')?.getAttribute('src') || '';
      const id = name.replace(/\s+/g, '-').toLowerCase(); // Genera un id simple

      // Crear objeto producto
      const producto = {
        id,
        name,
        price,
        quantity: 1,
        image,
        customizations: ''
      };

      agregarAlCarrito(producto);

      // Opcional: feedback visual
      this.textContent = "¡Agregado!";
      setTimeout(() => { this.textContent = "Agregar al carrito"; }, 1000);
    });
  })

  function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) cartCount.textContent = cart.length;
  }

  // Actualizar cantidad de un producto
  function updateQuantity(itemId, change) {
    const item = cart.find((item) => item.id === itemId)
    if (item) {
      const newQuantity = item.quantity + change
      if (newQuantity >= 1 && newQuantity <= 10) {
        item.quantity = newQuantity
        renderCart()
        updateSummary()
      }
    }
  }

  // Establecer cantidad específica
  function setQuantity(itemId, quantity) {
    const item = cart.find((item) => item.id === itemId)
    if (item) {
      item.quantity = quantity
      renderCart()
      updateSummary()
    }
  }

  // Obtener cantidad de un producto
  function getItemQuantity(itemId) {
    const item = cart.find((item) => item.id === itemId)
    return item ? item.quantity : 1
  }

  // Eliminar producto del carrito
  function removeItem(itemId) {
    cart = cart.filter((item) => item.id !== itemId)
    renderCart()
    updateSummary()
  }
//cart-count
  // Vaciar carrito
  function clearCart() {
  if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
    cart = []
    appliedPromo = null
    promoCodeInput.value = ""
    promoMessage.classList.remove("success", "error")
    promoMessage.style.display = "none"
    renderCart()
    updateSummary()
    // Reiniciar contador del carrito en el header
    const cartCount = document.querySelector('cart-count');
    if (cartCount) cartCount.textContent = "0";
  }
}

  // Actualizar resumen del pedido
  function updateSummary() {
    // Si no existen los elementos, no hacer nada
    if (!subtotalElement || !discountsElement || !taxElement || !totalElement) return;

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    let discount = 0

    // Aplicar descuento si hay código promocional
    if (appliedPromo) {
      if (appliedPromo.type === "percentage") {
        discount = subtotal * (appliedPromo.value / 100)
      } else if (appliedPromo.type === "fixed") {
        discount = Math.min(appliedPromo.value, subtotal)
      } else if (appliedPromo.type === "free_delivery") {
        deliveryFee = 0
      }
    }

    // Calcular costo de envío
    if (currentDeliveryMethod === "delivery" && (!appliedPromo || appliedPromo.type !== "free_delivery")) {
      deliveryFee = subtotal >= 300 ? 0 : 50 // Envío gratis para pedidos mayores a $300
    } else {
      deliveryFee = 0
    }

    const subtotalAfterDiscount = subtotal - discount
    const tax = subtotalAfterDiscount * 0.16 // 16% de impuestos
    const total = subtotalAfterDiscount + deliveryFee + tax

    // Actualizar elementos del DOM
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`
    discountsElement.textContent = discount > 0 ? `-$${discount.toFixed(2)}` : "$0.00"
    taxElement.textContent = `$${tax.toFixed(2)}`
    totalElement.textContent = `$${total.toFixed(2)}`

    if (currentDeliveryMethod === "delivery") {
      deliveryFeeElement.textContent = deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : "Gratis"
      deliveryFeeLine.classList.add("show")
    } else {
      deliveryFeeLine.classList.remove("show")
    }

    // Actualizar cambio para pago en efectivo
    updateChange()
  }

  // Actualizar cambio para pago en efectivo
  function updateChange() {
    const total = Number.parseFloat(totalElement.textContent.replace("$", ""))
    const cashAmount = Number.parseFloat(cashAmountInput.value) || 0
    const change = cashAmount - total

    if (change >= 0) {
      changeAmountSpan.textContent = `$${change.toFixed(2)}`
      changeAmountSpan.style.color = "#28a745"
    } else {
      changeAmountSpan.textContent = "Cantidad insuficiente"
      changeAmountSpan.style.color = "#dc3545"
    }
  }

  // Cambiar método de entrega
  function switchDeliveryMethod(method) {
    currentDeliveryMethod = method

    // Actualizar tabs
    deliveryTabs.forEach((tab) => {
      tab.classList.toggle("active", tab.getAttribute("data-delivery") === method)
    })

    // Mostrar información correspondiente
    deliveryInfos.forEach((info) => {
      info.classList.toggle("active", info.id === `${method}-info`)
    })

    updateSummary()
  }

  // Cambiar método de pago
  function switchPaymentMethod(method) {
    paymentInfos.forEach((info) => {
      info.classList.toggle("active", info.id === `${method}-payment`)
    })
  }

  // Aplicar código promocional
  function applyPromoCode() {
    const code = promoCodeInput.value.trim().toUpperCase()

    if (!code) {
      showPromoMessage("Por favor ingresa un código", "error")
      return
    }

    if (promoCodes[code]) {
      appliedPromo = promoCodes[code]
      showPromoMessage(`¡Código aplicado! ${appliedPromo.description}`, "success")
      updateSummary()
    } else {
      showPromoMessage("Código inválido o expirado", "error")
    }
  }

  // Mostrar mensaje de código promocional
  function showPromoMessage(message, type) {
    promoMessage.textContent = message
    promoMessage.className = `promo-message ${type}`
    promoMessage.style.display = "block"
  }

  // Validar formulario de entrega
  function validateDeliveryForm() {
    if (currentDeliveryMethod === "delivery") {
      const address = document.getElementById("delivery-address").value.trim()
      const city = document.getElementById("delivery-city").value.trim()
      const zip = document.getElementById("delivery-zip").value.trim()
      const phone = document.getElementById("delivery-phone").value.trim()

      return address && city && zip && phone
    }
    return true
  }

  // Validar método de pago
  function validatePayment() {
    const selectedPayment = document.querySelector('input[name="payment"]:checked').value

    if (selectedPayment === "card") {
      const cardNumber = document.getElementById("card-number").value.trim()
      const cardExpiry = document.getElementById("card-expiry").value.trim()
      const cardCvv = document.getElementById("card-cvv").value.trim()
      const cardName = document.getElementById("card-name").value.trim()

      return cardNumber && cardExpiry && cardCvv && cardName
    } else if (selectedPayment === "transfer") {
      const transferReference = document.getElementById("transfer-reference").value.trim()
      return transferReference
    } else if (selectedPayment === "cash") {
      const total = Number.parseFloat(totalElement.textContent.replace("$", ""))
      const cashAmount = Number.parseFloat(cashAmountInput.value) || 0
      return cashAmount >= total
    }

    return true
  }

  // Procesar pedido
  function processOrder() {
    if (cart.length === 0) {
      alert("Tu carrito está vacío")
      return
    }

    if (!validateDeliveryForm()) {
      alert("Por favor completa toda la información de entrega")
      return
    }

    if (!validatePayment()) {
      alert("Por favor completa la información de pago")
      return
    }

    // Simular procesamiento del pedido
    const orderNumber = Math.floor(Math.random() * 1000000)
    const estimatedTime = currentDeliveryMethod === "pickup" ? "20-30 minutos" : "45-60 minutos"
    const total = totalElement.textContent

    // Mostrar modal de confirmación
    document.getElementById("order-number").textContent = `#${orderNumber}`
    document.getElementById("estimated-time").textContent = estimatedTime
    document.getElementById("order-total").textContent = total

    orderModal.classList.add("show")

    // Limpiar carrito después del pedido
    cart = []
    appliedPromo = null
    renderCart()
    updateSummary()
  }

  // Event listeners
  deliveryTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const method = this.getAttribute("data-delivery")
      switchDeliveryMethod(method)
    })
  })

  paymentOptions.forEach((option) => {
    option.addEventListener("change", function () {
      switchPaymentMethod(this.value)
    })
  })

  if (clearCartBtn) clearCartBtn.addEventListener("click", clearCart)
  if (applyPromoBtn) applyPromoBtn.addEventListener("click", applyPromoCode)
  if (checkoutBtn) checkoutBtn.addEventListener("click", processOrder)
  if (cashAmountInput) cashAmountInput.addEventListener("input", updateChange)
  if (closeModal) closeModal.addEventListener("click", () => { orderModal.classList.remove("show") })
  if (orderModal) orderModal.addEventListener("click", (e) => {
    if (e.target === orderModal) orderModal.classList.remove("show")
  })

  // Formatear número de tarjeta
  const cardNumberInput = document.getElementById("card-number");
  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", function () {
      const value = this.value.replace(/\s/g, "").replace(/[^0-9]/gi, "")
      const formattedValue = value.match(/.{1,4}/g)?.join(" ") || value
      this.value = formattedValue
    });
  }

  // Formatear fecha de vencimiento
  const cardExpiryInput = document.getElementById("card-expiry");
  if (cardExpiryInput) {
    cardExpiryInput.addEventListener("input", function () {
      let value = this.value.replace(/\D/g, "")
      if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4)
      }
      this.value = value
    });
  }

  // Renderizar carrito
  function renderCart() {
    if (!cartItemsContainer) return; // Solo ejecuta si existe el contenedor

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      if (emptyCartContainer) emptyCartContainer.classList.add("show");
      return;
    }

    if (emptyCartContainer) emptyCartContainer.classList.remove("show");

    cart.forEach(item => {
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <div class="item-image"><img src="${item.image}" alt="${item.name}"></div>
        <div class="item-details">
          <div class="item-name">${item.name}</div>
          <div class="item-customizations">${item.customizations || ""}</div>
        </div>
        <div class="item-price">$${item.price.toFixed(2)}</div>
        <div class="item-quantity">${item.quantity}</div>
      `;
      cartItemsContainer.appendChild(div);
    });
  }

  // Inicializar
  initializeCart()
})
