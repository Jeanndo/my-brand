// @ts-nocheck
if (JSON.parse(localStorage.getItem("user")) === null) {
  location.href = "./../pages/login.html";
}
console.log(localStorage.getItem("userInfo"));
// ToolBar

const toolbar = document.getElementById("toolbar");
const menu = document.getElementById("menu");
const Secondmenu = document.getElementById("menu1");
const sideBar = document.getElementById("sidebar");
const list = document.getElementById("list");

menu.addEventListener("click", (event) => {
  event.preventDefault();
  toolbar.style.marginLeft = "145px";
  menu.style.display = "none";
  sideBar.style.width = "12%";
  list.style.display = "inline";
  Secondmenu.style.display = "block";
});

Secondmenu.addEventListener("click", (event) => {
  event.preventDefault();
  toolbar.style.marginLeft = "0px";
  menu.style.display = "block";
  Secondmenu.style.display = "none";
  list.style.display = "none";
  sideBar.style.width = "5%";
});

// MAIN BODY CONENTS

// GET DOM ELEMENTS BY IDs

const mainBody = document.getElementById("main");
const BlogTab = document.getElementById("blogTab");
const ProjectTab = document.getElementById("projectTab");
const UserTab = document.getElementById("userTab");
const projectForm = document.getElementById("projects__form");
const blogForm = document.getElementById("blog__form");
const users = document.getElementById("user__form");
const dashboardItems = document.getElementById("dashboard__items");
const dashboard = document.getElementById("dashboard");
const homeTab = document.getElementById("Home");
const messageTab = document.getElementById("messageTab");
const subTab = document.getElementById("subTab");
const messages = document.getElementById("messages");
const subscribers = document.getElementById("subscribers");

// SIDE BAR TAB BUTTONS

const homeButton = document.getElementById("home__button");
const user__button = document.getElementById("user__button");
const blog__button = document.getElementById("blog__button");
const project__button = document.getElementById("project__button");
const dashboard__button = document.getElementById("dashboard__button");
const message__button = document.getElementById("message__button");
const sub__button = document.getElementById("sub__button");

// HIDDING DASHBOARD CONTENTS

users.style.display = "none";
projectForm.style.display = "none";
blogForm.style.display = "none";
messages.style.display = "none";
subscribers.style.display = "none";

// SIDE BAR FUNCTIONALITY HANDLING

homeButton.addEventListener("click", (event) => {
  event.preventDefault();
  location.href = "./../index.html";
});

homeTab.addEventListener("click", (event) => {
  event.preventDefault();
  location.href = "./../index.html";
});

dashboard.addEventListener("click", (event) => {
  event.preventDefault();
  blogForm.style.display = "none";
  projectForm.style.display = "none";
  users.style.display = "none";
  messages.style.display = "none";
  subscribers.style.display = "none";

  dashboardItems.style.display = "block";
});

dashboard__button.addEventListener("click", (event) => {
  event.preventDefault();
  blogForm.style.display = "none";
  projectForm.style.display = "none";
  dashboardItems.style.display = "block";
  users.style.display = "none";
  messages.style.display = "none";
  subscribers.style.display = "none";
});

UserTab.addEventListener("click", (event) => {
  event.preventDefault();
  blogForm.style.display = "none";
  projectForm.style.display = "none";
  dashboardItems.style.display = "none";
  users.style.display = "block";
  messages.style.display = "none";
  subscribers.style.display = "none";
});

user__button.addEventListener("click", (event) => {
  event.preventDefault();
  blogForm.style.display = "none";
  projectForm.style.display = "none";
  dashboardItems.style.display = "none";
  users.style.display = "block";
  messages.style.display = "none";
  subscribers.style.display = "none";
});

BlogTab.addEventListener("click", (event) => {
  event.preventDefault();
  blogForm.style.display = "block";
  projectForm.style.display = "none";
  dashboardItems.style.display = "none";
  users.style.display = "none";
  messages.style.display = "none";
  subscribers.style.display = "none";
});

blog__button.addEventListener("click", (event) => {
  event.preventDefault();
  blogForm.style.display = "block";
  projectForm.style.display = "none";
  dashboardItems.style.display = "none";
  users.style.display = "none";
  messages.style.display = "none";
  subscribers.style.display = "none";
});

ProjectTab.addEventListener("click", (event) => {
  event.preventDefault();
  blogForm.style.display = "none";
  projectForm.style.display = "block";
  users.style.display = "none";
  dashboardItems.style.display = "none";
  messages.style.display = "none";
  subscribers.style.display = "none";
});

project__button.addEventListener("click", (event) => {
  event.preventDefault();
  blogForm.style.display = "none";
  projectForm.style.display = "block";
  users.style.display = "none";
  dashboardItems.style.display = "none";
  messages.style.display = "none";
  subscribers.style.display = "none";
});

messageTab.addEventListener("click", (event) => {
  event.preventDefault();
  blogForm.style.display = "none";
  projectForm.style.display = "none";
  users.style.display = "none";
  dashboardItems.style.display = "none";
  messages.style.display = "block";
  subscribers.style.display = "none";
});
message__button.addEventListener("click", (event) => {
  event.preventDefault();
  blogForm.style.display = "none";
  projectForm.style.display = "none";
  users.style.display = "none";
  dashboardItems.style.display = "none";
  messages.style.display = "block";
  subscribers.style.display = "none";
});

subTab.addEventListener("click", (event) => {
  event.preventDefault();
  blogForm.style.display = "none";
  projectForm.style.display = "none";
  users.style.display = "none";
  dashboardItems.style.display = "none";
  messages.style.display = "none";
  subscribers.style.display = "block";
});
sub__button.addEventListener("click", (event) => {
  event.preventDefault();
  blogForm.style.display = "none";
  projectForm.style.display = "none";
  users.style.display = "none";
  dashboardItems.style.display = "none";
  messages.style.display = "none";
  subscribers.style.display = "block";
});

// CREATING A BLOG

const CreateBlog = async (event) => {
  event.preventDefault();

  try {
    const formData = new FormData();
    formData.append("title", document.getElementById("Title").value);
    formData.append(
      "blogImage",
      document.getElementById("blog__imgurl").files[0]
    );
    formData.append("description", tinymce.activeEditor.getContent());

    console.log("Hello", document.getElementById("blog__imgurl").files[0]);
    const response = await fetch(
      "https://my-brand-codemoon.herokuapp.com/api/v1/blogs",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
        body: formData,
      }
    );
    const data = await response.json();
    const { error, message, status } = data;
    console.log("data", data);
    console.log(error, message, status);
  } catch (error) {
    console.log(error.stack);
  }
};

document
  .getElementById("create__blog_btn")
  .addEventListener("click", CreateBlog);

// CREATING A PROJECT

const createProject = async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append("name", document.getElementById("projectName").value);
  formData.append(
    "projectImage",
    document.getElementById("image_url").files[0]
  );
  formData.append("price", document.getElementById("project__price").value);
  formData.append("link", document.getElementById("project__link").value);
  try {
    const response = await fetch(
      "https://my-brand-codemoon.herokuapp.com/api/v1/projects",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
        body: formData,
      }
    );
    const data = await response.json();
    console.log(data);
    document.getElementById("blog__form").location.reload(true);
  } catch (error) {
    console.log(error);
  }
};

document.getElementById("create__btn").addEventListener("click", createProject);
