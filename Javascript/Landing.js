// @ts-nocheck

// DISPLAY BLOGS

const fetBlogs = async () => {
  try {
    const response = await fetch(
      "https://my-brand-codemoon.herokuapp.com/api/v1/blogs"
    )
    const blogs = await response.json()
    // console.log("blogs", blogs.data.data)
    const { error, message, status } = blogs
    document.getElementById("blog__container").innerHTML = blogs?.data?.data
      .slice(0, 3)
      ?.map(
        (blog) =>
          ` <div class="blogs__container">
          <div class="blog__card-description">
            <h4 class="blog__title">${
              blog?.title
            } <span class="PostedTime">Posted:${moment(
            blog?.CreatedAt
          ).fromNow()}</span></h4>
            <p class="blogs__description">
              ${blog?.description.substr(0, 300)}
              ...
            </p>
            <div class="blogs__actions">
              <div class="blogs__author"><span>Author</span></div>
              <div class="blogs__author__name"><span>${
                blog?.author
              }</span></div>
            </div>
          </div>
          <div class="blog__card-picture">
            <img
              src=${blog.blogImage}
              alt="blog"
            />
          </div>
        </div>
        `
      )
      .join("")
  } catch (error) {
    console.log(error.message)
  }
}

fetBlogs()

// DISPLAY PROJECTS

const fetchProjects = async () => {
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

    document.getElementById("projects__container").innerHTML =
      projects?.data?.data
        ?.slice(0, 3)
        .map(
          (project) =>
            ` <div class="projects__card" key=${project._id}>
            <figure>
              <img
                 src=${project.projectImage}
                alt=""
              />
              <figcaption>
                <div class="project__overlay">
                  <div class="projects__description">
                    <div class="projects__title"><span>${project.name}</span></div>
                    <div class="projects__link">
                      <a href="${project?.link}" class="projects__link-btn" target="_blank">
                        <div class="link__container">
                          <img src="./img/Projectbtn.png" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>`
        )
        .join("")
  } catch (error) {
    console.log(error.message)
  }
}

fetchProjects()

// SUBSCRIBE

const subscribe = async (event) => {
  event.preventDefault()
  const subscribe_form = document.getElementById("subscribe")
  const body = {
    email: subscribe_form.subscribe.value,
  }

  try {
    const response = await fetch(
      "https://my-brand-codemoon.herokuapp.com/api/v1/subscribe",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
    const subscriber = await response.json()
    const { message, status } = subscriber
    console.log("subscriber", subscriber)
    console.log("subscriber", status)
    if (message && status === "fail") {
      Toastify({
        text: message,
        className: "info",
        position: "center",
        style: {
          background: "linear-gradient(to right, red, #fb923c)",
        },
      }).showToast()
    } else if (message && status === "error") {
      Toastify({
        text: message.split("email:")[1],
        className: "info",
        position: "center",
        style: {
          background: "linear-gradient(to right, red, #fb923c)",
        },
      }).showToast()
    } else if (status === "success") {
      Toastify({
        text: "Thanks for Subscribing ✔",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #FFA500, #fb923c)",
        },
      }).showToast()
    }
  } catch (error) {
    console.log("hello")
  }
  subscribe_form.subscribe.value = ""
}
document.getElementById("subscribe__btn").addEventListener("click", subscribe)
// SHOW HUMBERGER

document
  .getElementById("hamburger__menu__btn")
  .addEventListener("click", (event) => {
    event.preventDefault()
    document.getElementById("hamburger-container").style.display = "block"
  })

// HIDE HAMBURGER

document
  .getElementById("close__hamburger")
  .addEventListener("click", (event) => {
    event.preventDefault()
    document.getElementById("hamburger-container").style.display = "none"
  })
