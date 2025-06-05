import { Chart } from "@/components/ui/chart"
document.addEventListener("DOMContentLoaded", () => {
  // Navigation
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll(".admin-section")
  const sectionTitle = document.getElementById("section-title")

  // Sample data
  let products = [
    {
      id: 1,
      name: "Pizza Pepperoni",
      category: "pizzas",
      description: "Pepperoni y queso mozzarella",
      prices: { small: 99, medium: 129, large: 169 },
      image: "pizza-pepperoni.jpeg",
      available: true,
    },
    {
      id: 2,
      name: "Pizza Hawaiana",
      category: "pizzas",
      description: "Jamón, piña y queso mozzarella",
      prices: { small: 109, medium: 139, large: 179 },
      image: "pizza-hawaiana.jpeg",
      available: true,
    },
    {
      id: 3,
      name: "Pizza Mexicana",
      category: "pizzas",
      description: "Chorizo, pimientos, aceitunas negras y queso",
      prices: { small: 119, medium: 149, large: 189 },
      image: "pizza-mexicana.jpeg",
      available: true,
    },
    {
      id: 4,
      name: "Refresco Cola",
      category: "bebidas",
      description: "Botella 600ml",
      prices: { small: 25, medium: null, large: null },
      image: "/placeholder.svg?height=200&width=200",
      available: true,
    },
    {
      id: 5,
      name: "Papas Fritas",
      category: "papas",
      description: "Crujientes papas fritas con sal",
      prices: { small: 39, medium: null, large: null },
      image: "/placeholder.svg?height=200&width=200",
      available: true,
    },
  ]

  let promotions = [
    {
      id: 1,
      name: "Descuento 20%",
      description: "20% de descuento en todas las pizzas",
      type: "percentage",
      value: 20,
      code: "PIZZA20",
      startDate: "2024-01-01T00:00",
      endDate: "2024-12-31T23:59",
      active: true,
    },
    {
      id: 2,
      name: "Envío Gratis",
      description: "Envío gratis en pedidos mayores a $200",
      type: "free_delivery",
      value: 0,
      code: "ENVIOGRATIS",
      startDate: "2024-01-01T00:00",
      endDate: "2024-12-31T23:59",
      active: true,
    },
  ]

  const orders = [
    {
      id: 1001,
      customer: "Juan Pérez",
      products: ["Pizza Pepperoni Grande", "Refresco Cola"],
      total: 194,
      type: "delivery",
      status: "preparing",
      date: "2024-01-15T14:30:00",
    },
    {
      id: 1002,
      customer: "María García",
      products: ["Pizza Hawaiana Mediana", "Papas Fritas"],
      total: 178,
      type: "pickup",
      status: "ready",
      date: "2024-01-15T14:15:00",
    },
    {
      id: 1003,
      customer: "Carlos López",
      products: ["Pizza Mexicana Grande", "Refresco Cola x2"],
      total: 239,
      type: "delivery",
      status: "delivered",
      date: "2024-01-15T13:45:00",
    },
    {
      id: 1004,
      customer: "Ana Martínez",
      products: ["Combo Familiar"],
      total: 279,
      type: "pickup",
      status: "cancelled",
      date: "2024-01-15T13:30:00",
    },
  ]

  const flashSales = [
    {
      id: 1,
      productId: 1,
      productName: "Pizza Pepperoni Grande",
      originalPrice: 169,
      discount: 50,
      salePrice: 84.5,
      startTime: new Date(),
      duration: 6, // hours
      reason: "cancelled_order",
      active: true,
    },
  ]

  const cancelledProducts = [
    {
      id: 1,
      productName: "Pizza Hawaiana Mediana",
      originalPrice: 139,
      quantity: 2,
      orderId: 1004,
      cancelledAt: new Date(),
    },
  ]

  // Navigation functionality
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const sectionId = link.getAttribute("data-section")

      // Update active nav link
      navLinks.forEach((l) => l.classList.remove("active"))
      link.classList.add("active")

      // Show corresponding section
      sections.forEach((s) => s.classList.remove("active"))
      document.getElementById(sectionId).classList.add("active")

      // Update section title
      sectionTitle.textContent = link.textContent.trim()

      // Load section-specific data
      loadSectionData(sectionId)
    })
  })

  // Load section data
  function loadSectionData(sectionId) {
    switch (sectionId) {
      case "dashboard":
        loadDashboard()
        break
      case "menu-management":
        loadProducts()
        break
      case "promotions":
        loadPromotions()
        break
      case "orders":
        loadOrders()
        break
      case "statistics":
        loadStatistics()
        break
      case "flash-sales":
        loadFlashSales()
        break
    }
  }

  // Dashboard functionality
  function loadDashboard() {
    loadRecentOrders()
    createWeeklySalesChart()
    createTopProductsChart()
  }

  function loadRecentOrders() {
    const tbody = document.getElementById("recent-orders-tbody")
    const recentOrders = orders.slice(0, 5)

    tbody.innerHTML = recentOrders
      .map(
        (order) => `
        <tr>
            <td>#${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.products.join(", ")}</td>
            <td>$${order.total.toFixed(2)}</td>
            <td><span class="status-badge status-${order.status}">${getStatusText(order.status)}</span></td>
            <td>${formatTime(order.date)}</td>
        </tr>
    `,
      )
      .join("")
  }

  function createWeeklySalesChart() {
    const ctx = document.getElementById("weekly-sales-chart").getContext("2d")
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
        datasets: [
          {
            label: "Ventas",
            data: [1200, 1900, 3000, 2500, 2200, 3200, 2800],
            borderColor: "#3498db",
            backgroundColor: "rgba(52, 152, 219, 0.1)",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => "$" + value,
            },
          },
        },
      },
    })
  }

  function createTopProductsChart() {
    const ctx = document.getElementById("top-products-chart").getContext("2d")
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Pizza Pepperoni", "Pizza Hawaiana", "Pizza Mexicana", "Otros"],
        datasets: [
          {
            data: [35, 25, 20, 20],
            backgroundColor: ["#3498db", "#e74c3c", "#f39c12", "#95a5a6"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    })
  }

  // Products management
  function loadProducts() {
    renderProducts()
    setupProductFilters()
  }

  function renderProducts(filteredProducts = products) {
    const grid = document.getElementById("products-grid")
    grid.innerHTML = filteredProducts
      .map(
        (product) => `
        <div class="product-card">
            <div class="product-image" style="background-image: url('${product.image}')">
                <span class="product-status ${product.available ? "product-available" : "product-unavailable"}">
                    ${product.available ? "Disponible" : "No disponible"}
                </span>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-prices">
                    ${product.prices.small ? `<span class="product-price">Ch: $${product.prices.small}</span>` : ""}
                    ${product.prices.medium ? `<span class="product-price">Med: $${product.prices.medium}</span>` : ""}
                    ${product.prices.large ? `<span class="product-price">Gr: $${product.prices.large}</span>` : ""}
                </div>
                <div class="product-actions">
                    <button class="btn-primary" onclick="editProduct(${product.id})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn-danger" onclick="deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        </div>
    `,
      )
      .join("")
  }

  function setupProductFilters() {
    const categoryFilter = document.getElementById("category-filter")
    const searchInput = document.getElementById("search-products")

    categoryFilter.addEventListener("change", filterProducts)
    searchInput.addEventListener("input", filterProducts)
  }

  function filterProducts() {
    const category = document.getElementById("category-filter").value
    const search = document.getElementById("search-products").value.toLowerCase()

    let filtered = products

    if (category) {
      filtered = filtered.filter((product) => product.category === category)
    }

    if (search) {
      filtered = filtered.filter(
        (product) => product.name.toLowerCase().includes(search) || product.description.toLowerCase().includes(search),
      )
    }

    renderProducts(filtered)
  }

  // Product modal functionality
  const productModal = document.getElementById("product-modal")
  const addProductBtn = document.getElementById("add-product-btn")
  const closeProductModal = document.getElementById("close-product-modal")
  const cancelProductBtn = document.getElementById("cancel-product")
  const productForm = document.getElementById("product-form")

  addProductBtn.addEventListener("click", () => {
    document.getElementById("product-modal-title").textContent = "Agregar Producto"
    productForm.reset()
    productForm.removeAttribute("data-product-id")
    productModal.classList.add("show")
  })

  closeProductModal.addEventListener("click", () => {
    productModal.classList.remove("show")
  })

  cancelProductBtn.addEventListener("click", () => {
    productModal.classList.remove("show")
  })

  productForm.addEventListener("submit", (e) => {
    e.preventDefault()
    saveProduct()
  })

  function saveProduct() {
    const formData = new FormData(productForm)
    const productId = productForm.getAttribute("data-product-id")

    const productData = {
      name: document.getElementById("product-name").value,
      category: document.getElementById("product-category").value,
      description: document.getElementById("product-description").value,
      prices: {
        small: Number.parseFloat(document.getElementById("product-price-small").value) || null,
        medium: Number.parseFloat(document.getElementById("product-price-medium").value) || null,
        large: Number.parseFloat(document.getElementById("product-price-large").value) || null,
      },
      image: document.getElementById("product-image").value || "/placeholder.svg?height=200&width=200",
      available: document.getElementById("product-available").checked,
    }

    if (productId) {
      // Edit existing product
      const index = products.findIndex((p) => p.id === Number.parseInt(productId))
      if (index !== -1) {
        products[index] = { ...products[index], ...productData }
      }
    } else {
      // Add new product
      const newProduct = {
        id: Math.max(...products.map((p) => p.id)) + 1,
        ...productData,
      }
      products.push(newProduct)
    }

    productModal.classList.remove("show")
    renderProducts()
    showNotification("Producto guardado exitosamente", "success")
  }

  // Global functions for product actions
  window.editProduct = (id) => {
    const product = products.find((p) => p.id === id)
    if (!product) return

    document.getElementById("product-modal-title").textContent = "Editar Producto"
    document.getElementById("product-name").value = product.name
    document.getElementById("product-category").value = product.category
    document.getElementById("product-description").value = product.description
    document.getElementById("product-price-small").value = product.prices.small || ""
    document.getElementById("product-price-medium").value = product.prices.medium || ""
    document.getElementById("product-price-large").value = product.prices.large || ""
    document.getElementById("product-image").value = product.image
    document.getElementById("product-available").checked = product.available

    productForm.setAttribute("data-product-id", id)
    productModal.classList.add("show")
  }

  window.deleteProduct = (id) => {
    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      products = products.filter((p) => p.id !== id)
      renderProducts()
      showNotification("Producto eliminado exitosamente", "success")
    }
  }

  // Promotions management
  function loadPromotions() {
    renderPromotions()
  }

  function renderPromotions() {
    const list = document.getElementById("promotions-list")
    list.innerHTML = promotions
      .map(
        (promotion) => `
        <div class="promotion-card">
            <div class="promotion-header">
                <h3 class="promotion-name">${promotion.name}</h3>
                <span class="promotion-status ${promotion.active ? "promotion-active" : "promotion-inactive"}">
                    ${promotion.active ? "Activa" : "Inactiva"}
                </span>
            </div>
            <div class="promotion-details">
                <p><strong>Descripción:</strong> ${promotion.description}</p>
                <p><strong>Tipo:</strong> ${getPromotionTypeText(promotion.type)}</p>
                <p><strong>Valor:</strong> ${getPromotionValueText(promotion.type, promotion.value)}</p>
                <p><strong>Código:</strong> ${promotion.code || "N/A"}</p>
                <p><strong>Vigencia:</strong> ${formatDate(promotion.startDate)} - ${formatDate(promotion.endDate)}</p>
            </div>
            <div class="promotion-actions">
                <button class="btn-primary" onclick="editPromotion(${promotion.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn-warning" onclick="togglePromotion(${promotion.id})">
                    <i class="fas fa-toggle-${promotion.active ? "on" : "off"}"></i> 
                    ${promotion.active ? "Desactivar" : "Activar"}
                </button>
                <button class="btn-danger" onclick="deletePromotion(${promotion.id})">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        </div>
    `,
      )
      .join("")
  }

  // Promotion modal functionality
  const promotionModal = document.getElementById("promotion-modal")
  const addPromotionBtn = document.getElementById("add-promotion-btn")
  const closePromotionModal = document.getElementById("close-promotion-modal")
  const cancelPromotionBtn = document.getElementById("cancel-promotion")
  const promotionForm = document.getElementById("promotion-form")

  addPromotionBtn.addEventListener("click", () => {
    document.getElementById("promotion-modal-title").textContent = "Crear Promoción"
    promotionForm.reset()
    promotionForm.removeAttribute("data-promotion-id")
    promotionModal.classList.add("show")
  })

  closePromotionModal.addEventListener("click", () => {
    promotionModal.classList.remove("show")
  })

  cancelPromotionBtn.addEventListener("click", () => {
    promotionModal.classList.remove("show")
  })

  promotionForm.addEventListener("submit", (e) => {
    e.preventDefault()
    savePromotion()
  })

  function savePromotion() {
    const promotionId = promotionForm.getAttribute("data-promotion-id")

    const promotionData = {
      name: document.getElementById("promotion-name").value,
      description: document.getElementById("promotion-description").value,
      type: document.getElementById("promotion-type").value,
      value: Number.parseFloat(document.getElementById("promotion-value").value) || 0,
      code: document.getElementById("promotion-code").value,
      startDate: document.getElementById("promotion-start").value,
      endDate: document.getElementById("promotion-end").value,
      active: document.getElementById("promotion-active").checked,
    }

    if (promotionId) {
      // Edit existing promotion
      const index = promotions.findIndex((p) => p.id === Number.parseInt(promotionId))
      if (index !== -1) {
        promotions[index] = { ...promotions[index], ...promotionData }
      }
    } else {
      // Add new promotion
      const newPromotion = {
        id: Math.max(...promotions.map((p) => p.id)) + 1,
        ...promotionData,
      }
      promotions.push(newPromotion)
    }

    promotionModal.classList.remove("show")
    renderPromotions()
    showNotification("Promoción guardada exitosamente", "success")
  }

  // Global functions for promotion actions
  window.editPromotion = (id) => {
    const promotion = promotions.find((p) => p.id === id)
    if (!promotion) return

    document.getElementById("promotion-modal-title").textContent = "Editar Promoción"
    document.getElementById("promotion-name").value = promotion.name
    document.getElementById("promotion-description").value = promotion.description
    document.getElementById("promotion-type").value = promotion.type
    document.getElementById("promotion-value").value = promotion.value
    document.getElementById("promotion-code").value = promotion.code
    document.getElementById("promotion-start").value = promotion.startDate
    document.getElementById("promotion-end").value = promotion.endDate
    document.getElementById("promotion-active").checked = promotion.active

    promotionForm.setAttribute("data-promotion-id", id)
    promotionModal.classList.add("show")
  }

  window.togglePromotion = (id) => {
    const promotion = promotions.find((p) => p.id === id)
    if (promotion) {
      promotion.active = !promotion.active
      renderPromotions()
      showNotification(`Promoción ${promotion.active ? "activada" : "desactivada"} exitosamente`, "success")
    }
  }

  window.deletePromotion = (id) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta promoción?")) {
      promotions = promotions.filter((p) => p.id !== id)
      renderPromotions()
      showNotification("Promoción eliminada exitosamente", "success")
    }
  }

  // Orders management
  function loadOrders() {
    renderOrders()
    setupOrderFilters()
  }

  function renderOrders(filteredOrders = orders) {
    const tbody = document.getElementById("orders-tbody")
    tbody.innerHTML = filteredOrders
      .map(
        (order) => `
        <tr>
            <td>#${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.products.join(", ")}</td>
            <td>$${order.total.toFixed(2)}</td>
            <td>${order.type === "delivery" ? "Domicilio" : "Recoger"}</td>
            <td><span class="status-badge status-${order.status}">${getStatusText(order.status)}</span></td>
            <td>${formatDateTime(order.date)}</td>
            <td>
                <div style="display: flex; gap: 5px;">
                    ${getOrderActions(order)}
                </div>
            </td>
        </tr>
    `,
      )
      .join("")
  }

  function setupOrderFilters() {
    const statusFilter = document.getElementById("order-status-filter")
    const dateFilter = document.getElementById("order-date-filter")

    statusFilter.addEventListener("change", filterOrders)
    dateFilter.addEventListener("change", filterOrders)
  }

  function filterOrders() {
    const status = document.getElementById("order-status-filter").value
    const date = document.getElementById("order-date-filter").value

    let filtered = orders

    if (status) {
      filtered = filtered.filter((order) => order.status === status)
    }

    if (date) {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.date).toISOString().split("T")[0]
        return orderDate === date
      })
    }

    renderOrders(filtered)
  }

  function getOrderActions(order) {
    const actions = []

    if (order.status === "pending") {
      actions.push(
        `<button class="btn-success" onclick="updateOrderStatus(${order.id}, 'preparing')">Preparar</button>`,
      )
      actions.push(`<button class="btn-danger" onclick="cancelOrder(${order.id})">Cancelar</button>`)
    } else if (order.status === "preparing") {
      actions.push(`<button class="btn-success" onclick="updateOrderStatus(${order.id}, 'ready')">Listo</button>`)
    } else if (order.status === "ready") {
      actions.push(
        `<button class="btn-success" onclick="updateOrderStatus(${order.id}, 'delivered')">Entregado</button>`,
      )
    }

    return actions.join("")
  }

  // Global functions for order actions
  window.updateOrderStatus = (id, newStatus) => {
    const order = orders.find((o) => o.id === id)
    if (order) {
      order.status = newStatus
      renderOrders()
      showNotification(`Pedido #${id} actualizado a ${getStatusText(newStatus)}`, "success")
    }
  }

  window.cancelOrder = (id) => {
    if (confirm("¿Estás seguro de que quieres cancelar este pedido?")) {
      const order = orders.find((o) => o.id === id)
      if (order) {
        order.status = "cancelled"

        // Add products to cancelled products list for flash sales
        order.products.forEach((productName) => {
          const product = products.find((p) => productName.includes(p.name))
          if (product) {
            cancelledProducts.push({
              id: Date.now() + Math.random(),
              productName: productName,
              originalPrice: product.prices.large || product.prices.medium || product.prices.small,
              quantity: 1,
              orderId: order.id,
              cancelledAt: new Date(),
            })
          }
        })

        renderOrders()
        showNotification(`Pedido #${id} cancelado`, "warning")
      }
    }
  }

  // Statistics management
  function loadStatistics() {
    setupStatsPeriodButtons()
    loadStatsData("week")
  }

  function setupStatsPeriodButtons() {
    const periodBtns = document.querySelectorAll(".period-btn")
    periodBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        periodBtns.forEach((b) => b.classList.remove("active"))
        btn.classList.add("active")
        loadStatsData(btn.getAttribute("data-period"))
      })
    })
  }

  function loadStatsData(period) {
    // Update summary stats based on period
    updateStatsSummary(period)
    createSalesTrendChart(period)
    loadTopProductsList(period)
  }

  function updateStatsSummary(period) {
    // Simulate different data based on period
    const statsData = {
      week: { sales: 45230, orders: 1247, ticket: 36.3, products: 2891 },
      month: { sales: 185420, orders: 4892, ticket: 37.9, products: 11234 },
      quarter: { sales: 542180, orders: 14567, ticket: 37.2, products: 33456 },
      year: { sales: 2156720, orders: 58234, ticket: 37.0, products: 134567 },
    }

    const data = statsData[period]
    document.getElementById("total-sales").textContent = `$${data.sales.toLocaleString()}`
    document.getElementById("total-orders").textContent = data.orders.toLocaleString()
    document.getElementById("avg-ticket").textContent = `$${data.ticket}`
    document.getElementById("products-sold").textContent = data.products.toLocaleString()
  }

  function createSalesTrendChart(period) {
    const ctx = document.getElementById("sales-trend-chart")
    if (ctx.chart) {
      ctx.chart.destroy()
    }

    const labels = {
      week: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
      month: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
      quarter: ["Mes 1", "Mes 2", "Mes 3"],
      year: ["T1", "T2", "T3", "T4"],
    }

    const data = {
      week: [6200, 7800, 8500, 7200, 9100, 12300, 10800],
      month: [28500, 32100, 29800, 35200],
      quarter: [185420, 198750, 158010],
      year: [542180, 598420, 516320, 499800],
    }

    ctx.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels[period],
        datasets: [
          {
            label: "Ventas",
            data: data[period],
            borderColor: "#3498db",
            backgroundColor: "rgba(52, 152, 219, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => "$" + value.toLocaleString(),
            },
          },
        },
      },
    })
  }

  function loadTopProductsList(period) {
    const topProducts = [
      { name: "Pizza Pepperoni", sales: 342, revenue: 57834 },
      { name: "Pizza Hawaiana", sales: 298, revenue: 51462 },
      { name: "Pizza Mexicana", sales: 267, revenue: 50433 },
      { name: "Combo Familiar", sales: 189, revenue: 52731 },
      { name: "Pizza Suprema", sales: 156, revenue: 31044 },
    ]

    const list = document.getElementById("top-products-list")
    list.innerHTML = topProducts
      .map(
        (product, index) => `
        <div class="top-product-item">
            <div class="product-rank">${index + 1}</div>
            <div class="product-details">
                <h4>${product.name}</h4>
                <p>${product.sales} unidades vendidas</p>
            </div>
            <div class="product-sales">
                <div class="sales-count">${product.sales}</div>
                <div class="sales-revenue">$${product.revenue.toLocaleString()}</div>
            </div>
        </div>
    `,
      )
      .join("")
  }

  // Flash Sales management
  function loadFlashSales() {
    renderActiveFlashSales()
    renderCancelledProducts()
    setupFlashSaleModal()
  }

  function renderActiveFlashSales() {
    const container = document.getElementById("active-flash-sales")
    container.innerHTML = flashSales
      .filter((sale) => sale.active)
      .map(
        (sale) => `
        <div class="flash-sale-card">
            <div class="flash-sale-header">
                <span class="flash-sale-badge">${sale.discount}% OFF</span>
                <span class="flash-sale-timer" id="timer-${sale.id}">
                    ${getRemainingTime(sale.startTime, sale.duration)}
                </span>
            </div>
            <div class="flash-sale-product">
                <h4>${sale.productName}</h4>
                <div class="flash-sale-prices">
                    <span class="original-price">$${sale.originalPrice.toFixed(2)}</span>
                    <span class="sale-price">$${sale.salePrice.toFixed(2)}</span>
                    <span class="discount-percentage">${sale.discount}% OFF</span>
                </div>
            </div>
            <div class="flash-sale-actions">
                <button class="btn-danger" onclick="endFlashSale(${sale.id})">
                    <i class="fas fa-stop"></i> Terminar
                </button>
            </div>
        </div>
    `,
      )
      .join("")

    // Update timers every minute
    flashSales.forEach((sale) => {
      if (sale.active) {
        updateFlashSaleTimer(sale)
      }
    })
  }

  function renderCancelledProducts() {
    const container = document.getElementById("cancelled-products-list")
    container.innerHTML = cancelledProducts
      .map(
        (product) => `
        <div class="cancelled-product-item">
            <div class="cancelled-product-info">
                <h4>${product.productName}</h4>
                <p>Cantidad: ${product.quantity} | Precio: $${product.originalPrice.toFixed(2)} | Pedido: #${product.orderId}</p>
                <p>Cancelado: ${formatDateTime(product.cancelledAt)}</p>
            </div>
            <div class="cancelled-product-actions">
                <button class="btn-warning" onclick="createFlashSaleFromCancelled(${product.id})">
                    <i class="fas fa-bolt"></i> Crear Venta Flash
                </button>
                <button class="btn-danger" onclick="removeCancelledProduct(${product.id})">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        </div>
    `,
      )
      .join("")
  }

  // Flash Sale modal functionality
  const flashSaleModal = document.getElementById("flash-sale-modal")
  const createFlashSaleBtn = document.getElementById("create-flash-sale-btn")
  const closeFlashSaleModal = document.getElementById("close-flash-sale-modal")
  const cancelFlashSaleBtn = document.getElementById("cancel-flash-sale")
  const flashSaleForm = document.getElementById("flash-sale-form")

  function setupFlashSaleModal() {
    // Populate product dropdown
    const productSelect = document.getElementById("flash-sale-product")
    productSelect.innerHTML =
      '<option value="">Seleccionar producto</option>' +
      products.map((product) => `<option value="${product.id}">${product.name}</option>`).join("")

    createFlashSaleBtn.addEventListener("click", () => {
      flashSaleForm.reset()
      flashSaleModal.classList.add("show")
    })

    closeFlashSaleModal.addEventListener("click", () => {
      flashSaleModal.classList.remove("show")
    })

    cancelFlashSaleBtn.addEventListener("click", () => {
      flashSaleModal.classList.remove("show")
    })

    flashSaleForm.addEventListener("submit", (e) => {
      e.preventDefault()
      createFlashSale()
    })
  }

  function createFlashSale() {
    const productId = Number.parseInt(document.getElementById("flash-sale-product").value)
    const discount = Number.parseInt(document.getElementById("flash-sale-discount").value)
    const duration = Number.parseInt(document.getElementById("flash-sale-duration").value)
    const reason = document.getElementById("flash-sale-reason").value

    const product = products.find((p) => p.id === productId)
    if (!product) return

    const originalPrice = product.prices.large || product.prices.medium || product.prices.small
    const salePrice = originalPrice * (1 - discount / 100)

    const newFlashSale = {
      id: Math.max(...flashSales.map((s) => s.id), 0) + 1,
      productId: productId,
      productName: product.name,
      originalPrice: originalPrice,
      discount: discount,
      salePrice: salePrice,
      startTime: new Date(),
      duration: duration,
      reason: reason,
      active: true,
    }

    flashSales.push(newFlashSale)
    flashSaleModal.classList.remove("show")
    renderActiveFlashSales()
    showNotification("Venta flash creada exitosamente", "success")
  }

  // Global functions for flash sales
  window.createFlashSaleFromCancelled = (cancelledProductId) => {
    const cancelledProduct = cancelledProducts.find((p) => p.id === cancelledProductId)
    if (!cancelledProduct) return

    const product = products.find((p) => cancelledProduct.productName.includes(p.name))
    if (!product) return

    // Pre-fill the form with cancelled product data
    document.getElementById("flash-sale-product").value = product.id
    document.getElementById("flash-sale-discount").value = 50 // Default 50% discount
    document.getElementById("flash-sale-duration").value = 6 // Default 6 hours
    document.getElementById("flash-sale-reason").value = "cancelled_order"

    flashSaleModal.classList.add("show")
  }

  window.endFlashSale = (id) => {
    if (confirm("¿Estás seguro de que quieres terminar esta venta flash?")) {
      const sale = flashSales.find((s) => s.id === id)
      if (sale) {
        sale.active = false
        renderActiveFlashSales()
        showNotification("Venta flash terminada", "warning")
      }
    }
  }

  window.removeCancelledProduct = (id) => {
    if (confirm("¿Estás seguro de que quieres eliminar este producto cancelado?")) {
      const index = cancelledProducts.findIndex((p) => p.id === id)
      if (index !== -1) {
        cancelledProducts.splice(index, 1)
        renderCancelledProducts()
        showNotification("Producto eliminado", "success")
      }
    }
  }

  // Utility functions
  function getStatusText(status) {
    const statusTexts = {
      pending: "Pendiente",
      preparing: "Preparando",
      ready: "Listo",
      delivered: "Entregado",
      cancelled: "Cancelado",
    }
    return statusTexts[status] || status
  }

  function getPromotionTypeText(type) {
    const typeTexts = {
      percentage: "Porcentaje",
      fixed: "Cantidad fija",
      "2x1": "2x1",
      free_delivery: "Envío gratis",
    }
    return typeTexts[type] || type
  }

  function getPromotionValueText(type, value) {
    if (type === "percentage") return `${value}%`
    if (type === "fixed") return `$${value}`
    if (type === "2x1") return "2x1"
    if (type === "free_delivery") return "Envío gratis"
    return value
  }

  function formatTime(dateString) {
    const date = new Date(dateString)
    return date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
  }

  function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES")
  }

  function formatDateTime(dateString) {
    const date = new Date(dateString)
    return date.toLocaleString("es-ES")
  }

  function getRemainingTime(startTime, durationHours) {
    const now = new Date()
    const endTime = new Date(startTime.getTime() + durationHours * 60 * 60 * 1000)
    const remaining = endTime - now

    if (remaining <= 0) return "Expirado"

    const hours = Math.floor(remaining / (1000 * 60 * 60))
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours}h ${minutes}m`
  }

  function updateFlashSaleTimer(sale) {
    const timerElement = document.getElementById(`timer-${sale.id}`)
    if (timerElement) {
      const remaining = getRemainingTime(sale.startTime, sale.duration)
      timerElement.textContent = remaining

      if (remaining === "Expirado") {
        sale.active = false
        renderActiveFlashSales()
      }
    }
  }

  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 3000;
      animation: slideIn 0.3s ease;
    `

    const colors = {
      success: "#27ae60",
      warning: "#f39c12",
      error: "#e74c3c",
      info: "#3498db",
    }

    notification.style.backgroundColor = colors[type] || colors.info
    notification.textContent = message

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.remove()
    }, 3000)
  }

  // Settings functionality
  const storeInfoForm = document.getElementById("store-info-form")
  const deliverySettingsForm = document.getElementById("delivery-settings-form")

  storeInfoForm.addEventListener("submit", (e) => {
    e.preventDefault()
    showNotification("Información de la tienda guardada", "success")
  })

  deliverySettingsForm.addEventListener("submit", (e) => {
    e.preventDefault()
    showNotification("Configuración de entrega guardada", "success")
  })

  // Initialize dashboard on load
  loadDashboard()

  // Update flash sale timers every minute
  setInterval(() => {
    flashSales.forEach((sale) => {
      if (sale.active) {
        updateFlashSaleTimer(sale)
      }
    })
  }, 60000)
})
