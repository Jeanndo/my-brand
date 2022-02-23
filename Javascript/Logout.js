const Logout = () => {
  // @ts-ignore
  firebase
    .auth()
    .signOut()
    .then(() => {
      localStorage.clear()
      location.href = "./../index.html"
    })
    .catch((error) => {
      console.log(error)
    })
}

document.getElementById("logout__btn").addEventListener("click", Logout)
