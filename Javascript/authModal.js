const modal = document.querySelector(".modal")
const hideIcon = document.querySelector(".modal #hide__icon")
const ShowLoginForm = document.querySelector("#showLogin")
const ShowSignupForm = document.querySelector("#showSingup")
const clickAway = document.querySelector("#about")
const clickAwayall = document.querySelector("#main")

hideIcon.addEventListener("click", hideModal)
ShowLoginForm.addEventListener("click", showModal)
ShowSignupForm.addEventListener("click", showModal)
clickAway.addEventListener("click", hideModal)
clickAwayall.addEventListener("click", hideModal)

function hideModal() {
  modal.id = "hide"
}
function showModal() {
  modal.id = "show"
}
