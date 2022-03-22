// @ts-nocheck
const signup_Form = document.getElementById("signup__btn")

signup_Form.addEventListener("submit", async (event) => {
  event.preventDefault()

  // CREATE USER
  const body = {
    firstName: signup_Form.firstName.value,
    lastName: signup_Form.lastName.value,
    email: signup_Form.email.value,
    password: signup_Form.password.value,
    confirmPassword: signup_Form.confirmPassword.value,
  }
  await fetch("https://my-brand-codemoon.herokuapp.com/api/v1/users/signup", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((json) => {
      const { error, message, status } = json
      console.log(error, message, status)
      document.getElementById("error").innerHTML = message
      document.getElementById("error").style.color = "red"
    })

  // CLEAR FORM
  signup_Form.firstName.value = ""
  signup_Form.lastName.value = ""
  signup_Form.email.value = ""
  signup_Form.password.value = ""
  signup_Form.confirmPassword.value = ""
})

// GOOGLE SIGINUP

// const googleAuth = () => {
//   let provider = new firebase.auth.GoogleAuthProvider()
//   firebase
//     .auth()
//     .signInWithPopup(provider)
//     .then((result) => {
//       let credential = result.credential
//       let token = credential.accessToken
//       let user = result.user
//       console.log("user", user)
//       const { xa, email, displayName, photoURL, uid } = user
//       console.log(xa, email, displayName, photoURL, uid)

//       localStorage.setItem(
//         "GoogleAuth",
//         JSON.stringify({
//           token: xa,
//           email: email,
//           name: displayName,
//           photoURL,
//           userId: uid,
//         })
//       )
//       if (
//         (JSON.parse(localStorage.getItem("GoogleAuth")).token &&
//           JSON.parse(localStorage.getItem("GoogleAuth")).email ===
//             "ukjeando@gmail.com") ||
//         JSON.parse(localStorage.getItem("GoogleAuth")).email ===
//           "ukwjeandedieu1@gmail.com"
//       ) {
//         location.href = "./../pages/Dashboard.html"
//       } else {
//         location.href = "./../index.html"
//       }
//     })
//     .catch((error) => {
//       let errorCode = error.code
//       let errorMessage = error.message
//       console.log(errorMessage)

//       let email = error.email

//       let credential = error.credential
//     })
// }

// document
//   .getElementById("google_signup__btn")
//   .addEventListener("click", googleAuth)
