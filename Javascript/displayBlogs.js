// @ts-nocheck

const fetchBlogs = async () => {
  try {
    const response = await fetch(
      "https://my-brand-codemoon.herokuapp.com/api/v1/blogs"
    )

    const blogs = await response.json()

    console.log("data", blogs.data.data)

    document.getElementById("blog").innerHTML = blogs.data.data
      ?.map(
        (blog) =>
          `   <div class="blogs__container" key=${blog._id}>
          <div class="blog__card-description">
            <h4 class="blog__title">${
              blog.title
            } <span class="PostedTime">Posted:${moment(
            blog.CreatedAt
          ).fromNow()}</span></h4>

            <p class="blogs__description">
            ${blog.description.substr(0, 300)}
              ...
            </p>
            <div class="blogs__actions">
              <div class="blogs__author"><span>Author:<strong>${
                blog.author
              }</strong></span></div>
              <div class="loadmore" id="readmorebtn" onclick="getBlogId('${
                blog._id
              }')">
               <button> Read more..</button>
              </div>
            </div>
          </div>
          <div class="blog__card-picture">
            <img
              src="https://cdn.pixabay.com/photo/2018/09/25/17/14/airplane-3702676__340.jpg"
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

fetchBlogs()

function getBlogId(id) {
  console.log(id)
  localStorage.setItem("blogId", JSON.stringify({ id }))

  let params = new URLSearchParams()
  params.append("id", id)
  location.href =
    " http://127.0.0.1:5500/mybrand/my-brand/pages/singleBlog.html?" +
    params.toString()
}

// SEARCH BLOG

document
  .getElementById("searchBtn")
  .addEventListener("click", async (event) => {
    event.preventDefault()

    try {
      const searchkeyword = document.getElementById("search").value

      const response = await fetch(
        "https://my-brand-codemoon.herokuapp.com/api/v1/blogs"
      )

      const blogs = await response.json()
      console.log("data", blogs.data.data)

      let searchResults
      if (searchkeyword !== "") {
        searchResults = blogs.data.data.filter((blog) => {
          return Object.values(blogs.data.data)
            .join(" ")
            .toLowerCase()
            .includes(searchkeyword.toLowerCase())
        })
      }

      if (searchkeyword !== "") {
        searchResults.length === 0
          ? (document.getElementById("blog").innerHTML = `
            <div style="margin-left:50px;text-align:center;">
            <div style="margin-bottom:20px; color:#28b485">Oops</div>
            <img style="width:400px;height:230px;" src="https://media4.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif?cid=6c09b9520be72e6b4a337dbb50fcd311a3f6b388c6354a4b&rid=giphy.gif&ct=g" alt="not found"></img>`)
          : (document.getElementById("blog").innerHTML = searchResults
              ?.map(
                (blog) =>
                  `   <div class="blogs__container" key=${blog._id}>
          <div class="blog__card-description">
            <h4 class="blog__title">${
              blog.title
            } <span class="PostedTime">Posted:${moment(
                    blog.CreatedAt
                  ).fromNow()}</span></h4>

            <p class="blogs__description">
            ${blog.description.substr(0, 300)}
              ...
            </p>
            <div class="blogs__actions">
              <div class="blogs__author"><span>Author:<strong>${
                blog.author
              }</strong></span></div>
              <div class="blogs__comments">
                <figure>
                  <img src="../img/greencomment.png" alt="comment" />
                  <figcaption>
                    <span class="blogs__comments-number">50</span>
                  </figcaption>
                </figure>
              </div>
              <div class="loadmore" id="readmorebtn" onclick="getBlogId('${
                blog._id
              }')">
                <a href="../pages/singleBlog.html" class="readbtn"
                  >Read more...</a
                >
              </div>
            </div>
          </div>
          <div class="blog__card-picture">
            <img
              src="https://cdn.pixabay.com/photo/2018/09/25/17/14/airplane-3702676__340.jpg"
              alt="blog"
            />
          </div>
        </div>

        `
              )
              .join(""))
      } else {
        document.getElementById("blog").innerHTML = blogs.data.data
          ?.map(
            (blog) =>
              `   <div class="blogs__container" key=${blog._id}>
          <div class="blog__card-description">
            <h4 class="blog__title">${
              blog.title
            } <span class="PostedTime">Posted:${moment(
                blog.CreatedAt
              ).fromNow()}</span></h4>

            <p class="blogs__description">
            ${blog.description.substr(0, 800)}
              ...
            </p>
            <div class="blogs__actions">
              <div class="blogs__author"><span>Author:<strong>${
                blog.Author
              }</strong></span></div>
              <div class="blogs__comments">
                <figure>
                  <img src="../img/greencomment.png" alt="comment" />
                  <figcaption>
                    <span class="blogs__comments-number">50</span>
                  </figcaption>
                </figure>
              </div>
              <div class="loadmore" id="readmorebtn" onclick="getBlogId('${
                blog._id
              }')">
                <a href="../pages/singleBlog.html" class="readbtn"
                  >Read more...</a
                >
              </div>
            </div>
          </div>
          <div class="blog__card-picture">
            <img
              src=https://cdn.pixabay.com/photo/2018/09/25/17/14/airplane-3702676__340.jpg
              alt="blog"
            />
          </div>
        </div>

        `
          )
          .join("")
      }
    } catch (error) {
      console.log(error.message)
    }
  })

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
    if (message) {
      document.getElementById("sub_error").innerHTML = message
      document.getElementById("sub_error").style.color = "white"
    } else if (status === "success") {
      document.getElementById("sub_error").innerHTML = "Thanks for subscribing"
      document.getElementById("sub_error").style.color = "white"
    }
  } catch (error) {
    console.log("hello")
  }
  subscribe_form.subscribe.value = ""
}
document.getElementById("subscribe__btn").addEventListener("click", subscribe)
