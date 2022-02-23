// @ts-nocheck
const db = firebase.firestore()

// SHOW AND HIDE COMMENTS

const showComments = () => {
  document.getElementById("comments__list").style.display = "block"
}
const comments = document.getElementById("commentsbtn")
comments.addEventListener("click", showComments)

const hideComments = () => {
  document.getElementById("comments__list").style.display = "none"
}

const hideBtn = document.getElementById("expand")
hideBtn.addEventListener("click", hideComments)

// CREATE COMMENTS

const createComment = (event) => {
  event.preventDefault()

  const comment = document.getElementById("comment")

  db.collection("comments")
    .add({
      comments: comment.value,
    })
    .then((comment) => {
      console.log(comment)
    })
    .catch((error) => {
      const errorMessage = error.message
      console.log(errorMessage)
    })
  comment.value = ""
}

document.getElementById("addComment").addEventListener("click", createComment)

// CREATE CONTACT MESSAGE

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
}
document.getElementById("contact__btn").addEventListener("click", createContact)
