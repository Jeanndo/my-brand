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

const db = firebase.firestore()

// ToolBar

const toolbar = document.getElementById("toolbar")
const menu = document.getElementById("menu")
const Secondmenu = document.getElementById("menu1")
const sideBar = document.getElementById("sidebar")
const list = document.getElementById("list")

menu.addEventListener("click", (event) => {
  event.preventDefault()
  toolbar.style.marginLeft = "145px"
  menu.style.display = "none"
  sideBar.style.width = "12%"
  list.style.display = "inline"
  Secondmenu.style.display = "block"
})

Secondmenu.addEventListener("click", (event) => {
  event.preventDefault()
  toolbar.style.marginLeft = "0px"
  menu.style.display = "block"
  Secondmenu.style.display = "none"
  list.style.display = "none"
  sideBar.style.width = "5%"
})

const mainBody = document.getElementById("main")
const BlogTab = document.getElementById("blogTab")
const ProjectTab = document.getElementById("projectTab")
const UserTab = document.getElementById("userTab")
const projectForm = document.getElementById("projects__form")
const blogForm = document.getElementById("blog__form")
const users = document.getElementById("user__form")

const user__button = document.getElementById("user__button")
const blog__button = document.getElementById("blog__button")
const project__button = document.getElementById("project__button")

users.style.display = "none"
projectForm.style.display = "none"

UserTab.addEventListener("click", (event) => {
  event.preventDefault()
  blogForm.style.display = "none"
  projectForm.style.display = "none"
  users.style.display = "block"
})

user__button.addEventListener("click", (event) => {
  event.preventDefault()
  blogForm.style.display = "none"
  projectForm.style.display = "none"
  users.style.display = "block"
})

BlogTab.addEventListener("click", (event) => {
  event.preventDefault()
  blogForm.style.display = "block"
  projectForm.style.display = "none"
  users.style.display = "none"
})

blog__button.addEventListener("click", (event) => {
  event.preventDefault()
  blogForm.style.display = "block"
  projectForm.style.display = "none"
  users.style.display = "none"
})

ProjectTab.addEventListener("click", (event) => {
  event.preventDefault()
  blogForm.style.display = "none"
  projectForm.style.display = "block"
  users.style.display = "none"
})

project__button.addEventListener("click", (event) => {
  event.preventDefault()
  blogForm.style.display = "none"
  projectForm.style.display = "block"
  users.style.display = "none"
})

// CREATE BLOG

const createBlog = (event) => {
  event.preventDefault()
  const Title = document.getElementById("Title").value
  const blog__imgurl = document.getElementById("blog__imgurl").value
  const author = document.getElementById("author").value
  const myTextarea = document.getElementById("myTextarea").value

  db.collection("blogs")
    .add({
      Title: Title,
      ImageUrl: blog__imgurl,
      Author: author,
      Blog: myTextarea,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((projects) => {
      console.log(projects)
    })
    .catch((error) => {
      console.log(error)
    })
}

document
  .getElementById("create__blog_btn")
  .addEventListener("click", createBlog)

// CREATE PROJECT

const createProject = () => {
  const image_url = document.getElementById("image_url").value
  const project__name = document.getElementById("projectName").value
  const project__price = document.getElementById("project__price").value
  const project__link = document.getElementById("project__link").value

  db.collection("Projects")
    .add({
      imageUrl: image_url,
      projectName: project__name,
      projectPrice: project__price,
      projectLink: project__link,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((project) => {
      const data = project.firestore
      console.log(data)
      console.log(project)
    })
    .catch((error) => {
      console.log(error)
    })
}

document.getElementById("create__btn").addEventListener("click", createProject)

// GET PROJECTS

db.collection("Projects")
  .orderBy("timestamp", "desc")
  .onSnapshot((projetcs) => {
    const data = projetcs.docs.map((doc) => ({ data: doc.data(), id: doc.id }))

    console.log(data)
  })
db.collection("blogs")
  .orderBy("timestamp")
  .onSnapshot((blogs) => {
    const data = blogs.docs.map((doc) => ({ data: doc.data(), id: doc.id }))
    console.log(JSON.stringify(data))
  })
