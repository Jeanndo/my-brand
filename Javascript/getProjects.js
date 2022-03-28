// @ts-nocheck
const getFetchProjects = async () => {
  try {
    const response = await fetch(
      "https://my-brand-codemoon.herokuapp.com/api/v1/projects",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
      }
    )

    const projects = await response.json()

    console.log(projects.data.data)
    document.getElementById("project__row").innerHTML = projects?.data?.data
      ?.map(
        (project) =>
          `<div class="project__card" key=${project._id}>
                <img
                  src=${project.projectImage}
                  alt=${project.projectName}
                />
                <div class="project__actions">
                  <button class="edit__btn btn" onclick="getProjectToUpdate('${project._id}')">
                    <span class="material-icons"> edit </span>
                  </button>
                  <button class="delete__btn btn" onclick="deleteProject('${project._id}')">
                    <span class="material-icons"> delete </span>
                  </button>
                </div>
              </div>
              `
      )
      .join("")
  } catch (error) {
    console.log(error)
  }
}

getFetchProjects()

// GET ID OF THE PROJECT TO BE UPDATED

const getProjectToUpdate = async (id) => {
  localStorage.setItem("projectToUpdate", JSON.stringify({ id }))

  try {
    const response = await fetch(
      `https://my-brand-codemoon.herokuapp.com/api/v1/projects/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
      }
    )
    const project = await response.json()

    document.getElementById("projectName").value = project.data.data.name
    document.getElementById("project__price").value = project.data.data.price
    document.getElementById("project__link").value = project.data.data.link
    document.getElementById("update__project_btn").style.display =
      "inline-block"
  } catch (error) {
    console.log(error)
  }
}

// UPDATE PROJECT FUNCTION

const updateProject = async (event) => {
  event.preventDefault()
  const id = JSON.parse(localStorage.getItem("projectToUpdate")).id

  const body = {
    name: document.getElementById("projectName").value,
    projectImage: document.getElementById("image_url").files[0].name,
    price: document.getElementById("project__price").value,
    link: document.getElementById("project__link").value,
  }

  try {
    const response = await fetch(
      `https://my-brand-codemoon.herokuapp.com/api/v1/projects/${id}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
        body: JSON.stringify(body),
      }
    )
    console.log(id)
    const project = await response.json()
    console.log("data", project.data.data)
  } catch (error) {
    console.log(error)
  }
}

document
  .getElementById("update__project_btn")
  .addEventListener("click", updateProject)

// DELETE PROJECT FUNTION

const deleteProject = async (id) => {
  try {
    const response = await fetch(
      `https://my-brand-codemoon.herokuapp.com/api/v1/projects/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
      }
    )
    const project = await response.json()
    if (project.message) {
      Toastify({
        text: project.message,
        className: "info",
        position: "center",
        style: {
          background: "linear-gradient(to right, red, #fb923c)",
        },
      }).showToast()
    }
  } catch (error) {
    console.log(error)
  }
}
