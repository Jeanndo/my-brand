// @ts-nocheck
db.collection("blogs")
  .orderBy("timestamp", "desc")
  .onSnapshot((blogs) => {
    const data = blogs.docs.map((doc) => ({ data: doc.data(), id: doc.id }))

    document.getElementById("blog").innerHTML = data
      ?.map(
        (blog) =>
          `   <div class="blogs__container" key=${blog.id}>
          <div class="blog__card-description">
            <h4 class="blog__title">${
              blog.data.Title
            } <span class="PostedTime">Posted:${moment(
            blog.data.CreatedAt
          ).fromNow()}</span></h4>

            <p class="blogs__description">
            ${blog.data.Blog.substr(0, 300)}
              ...
            </p>
            <div class="blogs__actions">
              <div class="blogs__author"><span>Author:<strong>${
                blog.data.Author
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
                blog.id
              }')">
                <a href="../pages/singleBlog.html" class="readbtn"
                  >Read more...</a
                >
              </div>
            </div>
          </div>
          <div class="blog__card-picture">
            <img
              src=${blog.data.ImageUrl}
              alt="blog"
            />
          </div>
        </div>

        `
      )
      .join("")
  })

function getBlogId(id) {
  console.log(id)
  localStorage.setItem("blogId", JSON.stringify({ id }))
}

// SEARCH BLOG

document.getElementById("searchBtn").addEventListener("click", (event) => {
  event.preventDefault()
  const searchkeyword = document.getElementById("search").value

  db.collection("blogs")
    .orderBy("timestamp", "desc")
    .onSnapshot((blogs) => {
      const data = blogs.docs.map((doc) => ({ data: doc.data(), id: doc.id }))

      let searchResults
      if (searchkeyword !== "") {
        searchResults = data.filter((blog) => {
          return Object.values(blog.data)
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
                  `   <div class="blogs__container" key=${blog.id}>
          <div class="blog__card-description">
            <h4 class="blog__title">${
              blog.data.Title
            } <span class="PostedTime">Posted:${moment(
                    blog.data.CreatedAt
                  ).fromNow()}</span></h4>

            <p class="blogs__description">
            ${blog.data.Blog.substr(0, 300)}
              ...
            </p>
            <div class="blogs__actions">
              <div class="blogs__author"><span>Author:<strong>${
                blog.data.Author
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
                blog.id
              }')">
                <a href="../pages/singleBlog.html" class="readbtn"
                  >Read more...</a
                >
              </div>
            </div>
          </div>
          <div class="blog__card-picture">
            <img
              src=${blog.data.ImageUrl}
              alt="blog"
            />
          </div>
        </div>

        `
              )
              .join(""))
      } else {
        document.getElementById("blog").innerHTML = data
          ?.map(
            (blog) =>
              `   <div class="blogs__container" key=${blog.id}>
          <div class="blog__card-description">
            <h4 class="blog__title">${
              blog.data.Title
            } <span class="PostedTime">Posted:${moment(
                blog.data.CreatedAt
              ).fromNow()}</span></h4>

            <p class="blogs__description">
            ${blog.data.Blog.substr(0, 800)}
              ...
            </p>
            <div class="blogs__actions">
              <div class="blogs__author"><span>Author:<strong>${
                blog.data.Author
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
                blog.id
              }')">
                <a href="../pages/singleBlog.html" class="readbtn"
                  >Read more...</a
                >
              </div>
            </div>
          </div>
          <div class="blog__card-picture">
            <img
              src=${blog.data.ImageUrl}
              alt="blog"
            />
          </div>
        </div>

        `
          )
          .join("")
      }
    })
})
