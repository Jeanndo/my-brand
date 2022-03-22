// @ts-nocheck
// if (JSON.parse(localStorage.getItem("userInfo")) === null) {
//   location.href = "./../pages/login.html"
// }
console.log(localStorage.getItem("userInfo"))
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

// MAIN BODY CONENTS

// GET DOM ELEMENTS BY IDs

const mainBody = document.getElementById("main")
const BlogTab = document.getElementById("blogTab")
const ProjectTab = document.getElementById("projectTab")
const UserTab = document.getElementById("userTab")
const projectForm = document.getElementById("projects__form")
const blogForm = document.getElementById("blog__form")
const users = document.getElementById("user__form")
const dashboardItems = document.getElementById("dashboard__items")
const dashboard = document.getElementById("dashboard")
const homeTab = document.getElementById("Home")

// SIDE BAR TAB BUTTONS

const homeButton = document.getElementById("home__button")
const user__button = document.getElementById("user__button")
const blog__button = document.getElementById("blog__button")
const project__button = document.getElementById("project__button")
const dashboard__button = document.getElementById("dashboard__button")

// HIDDING DASHBOARD CONTENTS

users.style.display = "none"
projectForm.style.display = "none"
blogForm.style.display = "none"

// SIDE BAR FUNCTIONALITY HANDLING

homeButton.addEventListener("click", (event) => {
  event.preventDefault()
  location.href = "./../index.html"
})

homeTab.addEventListener("click", (event) => {
  event.preventDefault()
  location.href = "./../index.html"
})

dashboard.addEventListener("click", (event) => {
  event.preventDefault()
  blogForm.style.display = "none"
  projectForm.style.display = "none"
  users.style.display = "none"
  dashboardItems.style.display = "block"
})

dashboard__button.addEventListener("click", (event) => {
  event.preventDefault()
  blogForm.style.display = "none"
  projectForm.style.display = "none"
  dashboardItems.style.display = "block"
  users.style.display = "none"
})

UserTab.addEventListener("click", (event) => {
  event.preventDefault()
  blogForm.style.display = "none"
  projectForm.style.display = "none"
  dashboardItems.style.display = "none"
  users.style.display = "block"
})

user__button.addEventListener("click", (event) => {
  event.preventDefault()
  blogForm.style.display = "none"
  projectForm.style.display = "none"
  dashboardItems.style.display = "none"
  users.style.display = "block"
})

BlogTab.addEventListener("click", (event) => {
  event.preventDefault()
  blogForm.style.display = "block"
  projectForm.style.display = "none"
  dashboardItems.style.display = "none"
  users.style.display = "none"
})

blog__button.addEventListener("click", (event) => {
  event.preventDefault()
  blogForm.style.display = "block"
  projectForm.style.display = "none"
  dashboardItems.style.display = "none"
  users.style.display = "none"
})

ProjectTab.addEventListener("click", (event) => {
  event.preventDefault()
  blogForm.style.display = "none"
  projectForm.style.display = "block"
  users.style.display = "none"
  dashboardItems.style.display = "none"
})

project__button.addEventListener("click", (event) => {
  event.preventDefault()
  blogForm.style.display = "none"
  projectForm.style.display = "block"
  users.style.display = "none"
  dashboardItems.style.display = "none"
})

// CREATING A BLOG

const CreateBlog = async (event) => {
  event.preventDefault()

  try {
    const body = {
      title: document.getElementById("Title").value,
      blogImage: document.getElementById("blog__imgurl").files[0],
      description: tinymce.activeEditor.getContent(),
    }
    console.log("Hello", document.getElementById("blog__imgurl").files[0])
    const response = await fetch("http://localhost:8000/api/v1/blogs", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).token
        }`,
      },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    const { error, message, status } = data
    console.log(error, message, status)
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

document
  .getElementById("create__blog_btn")
  .addEventListener("click", CreateBlog)

// CREATING A PROJECT

const createProject = async (event) => {
  event.preventDefault()

  const body = {
    name: document.getElementById("projectName").value,
    projectImage: document.getElementById("image_url").files[0].name,
    price: document.getElementById("project__price").value,
    link: document.getElementById("project__link").value,
  }
  try {
    const response = await fetch(
      "https://my-brand-codemoon.herokuapp.com/api/v1/projects",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
        body: JSON.stringify(body),
      }
    )
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

document.getElementById("create__btn").addEventListener("click", createProject)
