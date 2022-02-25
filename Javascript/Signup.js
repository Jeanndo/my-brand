// @ts-nocheck
const signup_Btn = document.getElementById("signup__btn")

signup_Btn.addEventListener("click", (event) => {
  // GET DOM ELEMENTS BY IDs

  event.preventDefault()
  let email = document.getElementById("email")
  let password = document.getElementById("password")

  // CREATE USER

  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user
      console.log(user)
      const { email, xa, uid } = user
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ email: email, token: xa, userId: uid })
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
    })
    .catch((error) => {
      var errorCode = error.code
      var errorMessage = error.message
      console.log(errorMessage)
    })

  // CLEAR FORM

  email.value = ""
  password.value = ""
})

// GOOGLE SIGINUP

const googleAuth = () => {
  let provider = new firebase.auth.GoogleAuthProvider()
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      let credential = result.credential
      let token = credential.accessToken
      let user = result.user
      console.log("user", user)
      const { xa, email, displayName, photoURL, uid } = user
      console.log(xa, email, displayName, photoURL, uid)

      localStorage.setItem(
        "GoogleAuth",
        JSON.stringify({
          token: xa,
          email: email,
          name: displayName,
          photoURL,
          userId: uid,
        })
      )
      if (
        (JSON.parse(localStorage.getItem("GoogleAuth")).token &&
          JSON.parse(localStorage.getItem("GoogleAuth")).email ===
            "ukjeando@gmail.com") ||
        JSON.parse(localStorage.getItem("GoogleAuth")).email ===
          "ukwjeandedieu1@gmail.com"
      ) {
        location.href = "./../pages/Dashboard.html"
      } else {
        location.href = "./../index.html"
      }
    })
    .catch((error) => {
      let errorCode = error.code
      let errorMessage = error.message
      console.log(errorMessage)

      let email = error.email

      let credential = error.credential
    })
}

document
  .getElementById("google_signup__btn")
  .addEventListener("click", googleAuth)
