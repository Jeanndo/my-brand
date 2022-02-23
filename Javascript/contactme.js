// @ts-nocheck

const db = firebase.firestore()

// TOAST
const Toast = {
  init() {
    this.hideTimemout = null

    this.el = document.createElement("div")
    this.el.className = "toast"
    document.body.appendChild(this.el)
  },
  show(message, state) {
    clearTimeout(this.hideTimemout)
    this.el.textContent = message
    this.el.className = "toast toast__visible"
    if (state) {
      this.el.classList.add(`toast__${state}`)
    }
    this.hideTimemout = setTimeout(() => {
      this.el.classList.remove("toast__visible")
    }, 300)
  },
}

document.addEventListener("DOMContentLoaded", () => Toast.init())

// CREATE CONTACT INFO

const createContact = (event) => {
  event.preventDefault()

  const fullname = document.getElementById("fullname")
  const email = document.getElementById("email")
  const subject = document.getElementById("subject")
  const message = document.getElementById("message")

  db.collection("contactMessage")
    .add({
      Name: fullname.value,
      Email: email.value,
      Subject: subject.value,
      Message: message.value,
    })
    .then((message) => {
      console.log(message)
    })
    .catch((error) => {
      console.log(error)
    })
  fullname.value = ""
  email.value = ""
  subject.value = ""
  message.value = ""
  Toast.show("Created", "success")
}
document.getElementById("contact__btn").addEventListener("click", createContact)
