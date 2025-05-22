document.addEventListener("DOMContentLoaded", () => {
  // Seleccionar elementos
  const authTabs = document.querySelectorAll(".auth-tab")
  const loginForm = document.getElementById("login-form")
  const registerForm = document.getElementById("register-form")
  const passwordToggles = document.querySelectorAll(".toggle-password")
  const registerPassword = document.getElementById("register-password")
  const confirmPassword = document.getElementById("register-confirm-password")
  const strengthBar = document.querySelector(".strength-bar")
  const strengthText = document.querySelector(".strength-text")

  // Cambiar entre formularios de login y registro
  authTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Eliminar clase 'active' de todas las pestañas
      authTabs.forEach((t) => t.classList.remove("active"))

      // Agregar clase 'active' a la pestaña clickeada
      this.classList.add("active")

      // Ocultar todos los formularios
      loginForm.classList.remove("active")
      registerForm.classList.remove("active")

      // Mostrar el formulario correspondiente
      const tabId = this.getAttribute("data-tab")
      if (tabId === "login") {
        loginForm.classList.add("active")
      } else if (tabId === "register") {
        registerForm.classList.add("active")
      }
    })
  })

  // Toggle para mostrar/ocultar contraseña
  passwordToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const passwordInput = this.parentElement.querySelector("input")
      const icon = this.querySelector("i")

      if (passwordInput.type === "password") {
        passwordInput.type = "text"
        icon.classList.remove("fa-eye")
        icon.classList.add("fa-eye-slash")
      } else {
        passwordInput.type = "password"
        icon.classList.remove("fa-eye-slash")
        icon.classList.add("fa-eye")
      }
    })
  })

  // Calcular fuerza de la contraseña
  registerPassword.addEventListener("input", function () {
    const password = this.value
    let strength = 0
    let message = ""

    if (password.length >= 8) strength += 25
    if (password.match(/[a-z]/)) strength += 25
    if (password.match(/[A-Z]/)) strength += 25
    if (password.match(/[0-9]/)) strength += 25
    if (password.match(/[^a-zA-Z0-9]/)) strength += 25

    // Limitar a 100%
    strength = Math.min(strength, 100)

    // Actualizar la barra y el texto según la fuerza
    strengthBar.style.width = `${strength}%`

    if (strength < 25) {
      strengthBar.style.backgroundColor = "#ff0000" // Rojo
      message = "Muy débil"
    } else if (strength < 50) {
      strengthBar.style.backgroundColor = "#ff8000" // Naranja
      message = "Débil"
    } else if (strength < 75) {
      strengthBar.style.backgroundColor = "#ffcc00" // Amarillo
      message = "Moderada"
    } else {
      strengthBar.style.backgroundColor = "#00cc00" // Verde
      message = "Fuerte"
    }

    strengthText.textContent = message
  })

  // Validación de formularios
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const email = document.getElementById("login-email").value.trim()
    const password = document.getElementById("login-password").value.trim()

    // Validaciones básicas
    if (!email || !password) {
      alert("Por favor, completa todos los campos")
      return
    }

    // Aquí iría el código para enviar los datos al servidor
    console.log("Inicio de sesión con:", { email })

    // Simulación de inicio de sesión exitoso
    alert("¡Inicio de sesión exitoso!")
    window.location.href = "index.html" // Redirigir al inicio
  })

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("register-name").value.trim()
    const email = document.getElementById("register-email").value.trim()
    const phone = document.getElementById("register-phone").value.trim()
    const password = document.getElementById("register-password").value.trim()
    const confirmPwd = document.getElementById("register-confirm-password").value.trim()
    const termsChecked = document.getElementById("terms").checked

    // Validaciones básicas
    if (!name || !email || !phone || !password) {
      alert("Por favor, completa todos los campos")
      return
    }

    if (password !== confirmPwd) {
      alert("Las contraseñas no coinciden")
      return
    }

    if (!termsChecked) {
      alert("Debes aceptar los términos y condiciones")
      return
    }

    // Validar formato de email con una expresión regular sencilla
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("Por favor, ingresa un correo electrónico válido")
      return
    }

    // Aquí iría el código para enviar los datos al servidor
    console.log("Registro con:", { name, email, phone })

    // Simulación de registro exitoso
    alert("¡Registro exitoso! Ahora puedes iniciar sesión")

    // Cambiar a la pestaña de inicio de sesión
    authTabs[0].click()
  })
})
