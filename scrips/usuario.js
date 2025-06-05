document.addEventListener("DOMContentLoaded", () => {
  console.log("usuario.js cargado"); // Verifica que esto aparece en consola
  console.log("usuarioLogueado:", localStorage.getItem("usuarioLogueado")); // Verifica valor

  const chatButtonWrapper = document.querySelector(".chat-button")
  const logoutButtonWrapper = document.querySelector(".logout-button")

  const isLoggedIn = localStorage.getItem("usuarioLogueado") === "true"

  if (isLoggedIn) {
    if (chatButtonWrapper) chatButtonWrapper.style.display = "none"
    if (logoutButtonWrapper) logoutButtonWrapper.style.display = "block"
  } else {
    if (chatButtonWrapper) chatButtonWrapper.style.display = "block"
    if (logoutButtonWrapper) logoutButtonWrapper.style.display = "none"
  }

  const logoutBtn = document.querySelector(".btn-logout")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogueado")
      alert("Has cerrado sesión")
      window.location.reload()
    })
  }
})

