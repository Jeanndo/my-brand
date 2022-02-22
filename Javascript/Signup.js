// @ts-nocheck
const firebaseConfig = {
  apiKey: "AIzaSyDH5lFS8x2vtrvg70AmGNmSuHIDrnUnu48",

  authDomain: "mybrand-998e8.firebaseapp.com",

  projectId: "mybrand-998e8",

  storageBucket: "mybrand-998e8.appspot.com",

  messagingSenderId: "466642224284",

  appId: "1:466642224284:web:a59e7a35f0e5da75a55959",
}

firebase.initializeApp(firebaseConfig)

const signup_Btn = document.getElementById("signup__btn")

signup_Btn.addEventListener("click", (event) => {
  // GET DOM ELEMENTS BY IDS

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
      // console.log(token)
      let user = result.user
      // console.log("user", user)
      const { xa, email, displayName, photoURL, uid } = user
      console.log(xa, email, displayName, photoURL, uid)

      localStorage.setItem(
        "GoogleAuth",
        JSON.stringify({
          token: xa,
          email: email,
          name: displayName,
          photo: photoURL,
          userId: uid,
        })
      )
      if (
        JSON.parse(localStorage.getItem("GoogleAuth")).token &&
        JSON.parse(localStorage.getItem("GoogleAuth")).email ===
          "ukjeando@gmail.com"
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
  // location.href = "./../pages/Dashboard.html"
}

document
  .getElementById("google_signup__btn")
  .addEventListener("click", googleAuth)

// const signout = () => {
//     firebase
//       .auth()
//       .signOut()
//       .then(() => {
//         // Sign-out successful.
//       })
//       .catch((error) => {
//         // An error happened.
//       })
//   }
