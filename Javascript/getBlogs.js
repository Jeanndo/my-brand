// @ts-nocheck

const getBlogsFromMongoDB = async () => {
  try {
    const response = await fetch(
      "https://my-brand-codemoon.herokuapp.com/api/v1/blogs"
    )
    const data = await response.json()
    document.getElementById("blog").innerHTML = data?.data?.data
      ?.map(
        (blog) => `<div class="blogs__container" key=${blog._id}>
                <div class="blog__card-description">
                  <h4 class="blog__title"id="Jeanndo">${blog.title}  
                     <span class="PostedTime">${moment(
                       blog.CreatedAt
                     ).fromNow()}</span>
                    </h4>
             
                  <p class="blogs__description" id="paragraph">
                   ${blog.description.substr(0, 300)}
                   ...
                  </p>
                  <div class="blogs__actions">
                    <div class="blogs__author"><span>Author</span></div>
                    <div class="blogs__author__name"><span>
                    ${blog.author}</span></div>
                    <button class="edit__btn btn" id="edit__btn"onclick="getBlogToUpdate('${
                      blog._id
                    }')">
                      <span class="material-icons"> edit </span>
                    </button>
                    <button class="delete__btn btn" id="delete__btn" onclick="deleteBlog('${
                      blog._id
                    }')">
                      <span class="material-icons"> delete </span>
                    </button>
                  </div>
                  
                </div>
                <div class="blog__card-picture">
                  <img
                    src="https://cdn.pixabay.com/photo/2016/03/31/20/53/bicycle-1296063__480.png"
                    alt="blog"
                  />
                </div>
              </div>
              
             `
      )
      .join("")
  } catch (error) {
    console.log(error)
  }
}

getBlogsFromMongoDB()

// GET ID OF THE BLOG TO BE UPDATED

const getBlogToUpdate = async (id) => {
  localStorage.setItem("blogToUpdate", JSON.stringify({ id }))

  try {
    const response = await fetch(
      `https://my-brand-codemoon.herokuapp.com/api/v1/blogs/${id}`
    )

    const data = await response.json()

    document.getElementById("Title").value = data.data.data.title
    tinymce.activeEditor.setContent(data.data.data.description)
    document.getElementById("update__blog_btn").style.display = "inline-block"
  } catch (error) {
    console.log(error)
  }
}

// UPDATE BLOG

const updateBlog = async (event) => {
  event.preventDefault()
  const id = JSON.parse(localStorage.getItem("blogToUpdate")).id

  try {
    const body = {
      title: document.getElementById("Title").value,
      blogImage: document.getElementById("blog__imgurl")?.files[0]?.name,
      description: tinymce.activeEditor.getContent(),
    }
    const response = await fetch(
      `https://my-brand-codemoon.herokuapp.com/api/v1/blogs/${id}`,
      {
        method: "PATCH",
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

document
  .getElementById("update__blog_btn")
  .addEventListener("click", updateBlog)

// DELETING A BLOG

const deleteBlog = async (id) => {
  try {
    const response = await fetch(
      `https://my-brand-codemoon.herokuapp.com/api/v1/blogs/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
      }
    )

    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log(data)
  }
}
