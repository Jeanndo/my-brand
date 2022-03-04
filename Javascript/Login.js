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
      const { email, xa, uid } = user
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          email: email,
          token: xa,
          userId: uid,
        })
      )
      if (
        JSON.parse(localStorage?.getItem("userInfo"))?.token &&
        JSON.parse(localStorage?.getItem("userInfo"))?.email ===
          "ukjeando@gmail.com"
      ) {
        location.href = "./../pages/Dashboard.html"
      } else {
        location.href = "./../index.html"
      }
      console.log(JSON.parse(localStorage.getItem("userInfo")))
    })
    .catch((error) => {
      var errorCode = error.code
      var errorMessage = error.message
      console.log(errorMessage)
      document.getElementById("error").innerHTML = errorMessage
      document.getElementById("error").style.color = "red"
    })
  // CLEAR FORM

  email.value = ""
  password.value = ""
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
