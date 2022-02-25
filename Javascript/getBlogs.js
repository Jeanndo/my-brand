db.collection("blogs")
  .orderBy("timestamp", "desc")
  .onSnapshot((blogs) => {
    const data = blogs.docs.map((doc) => ({ data: doc.data(), id: doc.id }))
    document.getElementById("blog").innerHTML = data
      ?.map(
        (blog) =>
          `<div class="blogs__container" key=${blog.id}>
                <div class="blog__card-description">
                  <h4 class="blog__title"id="Jeanndo">${blog.data.Title}</h4>
                  <p class="blogs__description">
                   ${blog.data.Blog.substr(0, 700)}
                  </p>
                  <div class="blogs__actions">
                    <div class="blogs__author"><span>Author</span></div>
                    <div class="blogs__author__name"><span>${
                      blog.data.Author
                    }</span></div>
                    <button class="edit__btn btn">
                      <span class="material-icons"> edit </span>
                    </button>
                    <button class="delete__btn btn">
                      <span class="material-icons"> delete </span>
                    </button>
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
