// @ts-nocheck
const loginForm = document.getElementById("login_form")
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault()
  const body = {
    email: loginForm.email.value,
    password: loginForm.password.value,
  }
  console.log(body)
  try {
    const response = await fetch(
      "https://my-brand-codemoon.herokuapp.com/api/v1/users/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    )
    const user = await response.json()
    const { error, message, status, token } = user

    localStorage.setItem("user", JSON.stringify({ role: user.data.user.role }))
    if (user.data.user.role === "admin") {
      location.href = "./../pages/Dashboard.html"
    }
    Toastify({
      text: "Loged in successfully! 👍🏾",
      className: "info",
      position: "center",
      style: {
        background: "linear-gradient(to right, red, #fb923c)",
      },
    }).showToast()
    localStorage.setItem("token", JSON.stringify({ token }))
  } catch (error) {
    console.log(error)
  }
  loginForm.email.value = ""
  loginForm.password.value = ""
})

// 205890262805 - pv3mh5v0q127htimv5g0vesvqhjq6gej.apps.googleusercontent.com
