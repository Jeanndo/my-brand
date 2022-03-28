const Logout = () => {
  // @ts-ignore
  firebase
    .auth()
    .signOut()
    .then(() => {
      localStorage.setItem("user", JSON.stringify(null))

      location.href = "./../pages/login.html"
    })
    .catch((error) => {
      console.log(error)
    })
}

document.getElementById("logout__btn").addEventListener("click", Logout)
