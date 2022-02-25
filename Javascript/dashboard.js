// @ts-nocheck
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

// SIDE BAR TAB BUTTONS

const user__button = document.getElementById("user__button")
const blog__button = document.getElementById("blog__button")
const project__button = document.getElementById("project__button")
const dashboard__button = document.getElementById("dashboard__button")

// HIDDING DASHBOARD CONTENTS

users.style.display = "none"
projectForm.style.display = "none"
blogForm.style.display = "none"

// SIDE BAR FUNCTIONALITY HANDLING

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

const CreateBlog = (event) => {
  event.preventDefault()

  const blog__imgurl = document.getElementById("blog__imgurl").files[0]
  const imageName = blog__imgurl.name
  const blogRef = firebase.storage().ref(`Images/${imageName}`)

  const uploadTask = blogRef.put(blog__imgurl)
  const Title = document.getElementById("Title").value
  const BlogText = tinymce.activeEditor.getContent()

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

      document.getElementById("uploading__blog__process").innerHTML =
        "Upload is " + progress + "% done"

      switch (snapshot.state) {
        case firebase.storage.TaskState.paused:
          console.log("uplaoding paused")
          break
        case firebase.storage.TaskState.running:
          console.log("uplaod is running")
      }
    },
    (error) => {
      console.log(error)
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadedImage) => {
        db.collection("blogs")
          .add({
            Title: Title,
            ImageUrl: downloadedImage,
            Blog: BlogText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then((blogs) => {
            console.log(blogs)
          })
          .catch((error) => {
            console.log(error)
          })
      })
    }
  )
}

document
  .getElementById("create__blog_btn")
  .addEventListener("click", CreateBlog)

// CREATING A PROJECT

const createProject = (event) => {
  event.preventDefault()

  const Image_url = document.getElementById("image_url").files[0]
  const imageName = image_url.name
  const projectRef = firebase.storage().ref(`Projects/${imageName}`)

  const uploadTask = projectRef.put(Image_url)
  const project__name = document.getElementById("projectName").value
  const project__price = document.getElementById("project__price").value
  const project__link = document.getElementById("project__link").value

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      document.getElementById("uploading__project__process").innerHTML =
        "Upload is " + progress + "% done"

      switch (snapshot.state) {
        case firebase.storage.TaskState.paused:
          console.log("uplaoding paused")
          break
        case firebase.storage.TaskState.running:
          console.log("uploading is running")
          break
      }
    },
    (error) => {
      console.log(error)
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadedImage) => {
        db.collection("Projects")
          .add({
            imageUrl: downloadedImage,
            projectName: project__name,
            projectPrice: project__price,
            projectLink: project__link,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then((project) => {
            console.log(project)
          })
          .catch((error) => {
            console.log(error)
          })
      })
    }
  )
}

document.getElementById("create__btn").addEventListener("click", createProject)
