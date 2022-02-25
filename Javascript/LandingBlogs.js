// @ts-nocheck
db.collection("blogs")
  .orderBy("timestamp", "desc")
  .onSnapshot((blogs) => {
    const data = blogs.docs.map((doc) => ({ data: doc.data(), id: doc.id }))
    document.getElementById("blog__container").innerHTML = data
      .slice(0, 3)
      ?.map(
        (blog) =>
          ` <div class="blogs__container">
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
              <div class="blogs__author"><span>Author</span></div>
              <div class="blogs__author__name"><span>${
                blog.data.Author
              }</span></div>
              <div class="blogs__comments">
                <figure>
                  <img src="./img/greencomment.png" alt="comment" />
                  <figcaption>
                    <div class="blogs__comments-number">5</div>
                  </figcaption>
                </figure>
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
