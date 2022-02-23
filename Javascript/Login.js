// @ts-nocheck
const login_Btn = document.getElementById("login__btn")

// SETTING EVENT LISTENER ON LOGIN BTN

login_Btn.addEventListener("click", (event) => {
  // GET DOM ELEMENTS BY IDS

  event.preventDefault()
  let email = document.getElementById("email")
  let password = document.getElementById("password")

  // LOGIN USER

  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user
      console.log(user)
    })
    .catch((error) => {
      var errorCode = error.code
      var errorMessage = error.message
      console.log(errorMessage)
    })
  // CLEAR FORM

  email.value = ""
  password.value = ""
  location.href = "./../pages/Dashboard.html"
})

const googleAuth = () => {
  let provider = new firebase.auth.GoogleAuthProvider()
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential
      var token = credential.accessToken
      var user = result.user
      console.log("user", user)
    })
    .catch((error) => {
      var errorCode = error.code
      var errorMessage = error.message
      console.log(errorMessage)

      var email = error.email

      var credential = error.credential
    })
}

document
  .getElementById("google_signup__btn")
  .addEventListener("click", googleAuth)
