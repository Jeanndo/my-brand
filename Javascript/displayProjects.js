// DISPLAYING PROJECTS
// @ts-nocheck
db.collection("Projects")
  .orderBy("timestamp", "desc")
  .onSnapshot((project) => {
    const data = project.docs.map((doc) => ({ id: doc.id, data: doc.data() }))

    document.getElementById("projects__container").innerHTML = data
      .map(
        (project) =>
          ` <div class="projects__card" key=${project.id}>
            <figure>
              <img
                src=${project.data.imageUrl}
              />
              <figcaption>
                <div class="project__overlay">
                  <div class="projects__description">
                    <span class="project__price">${project.data.projectPrice} $</span>
                    <div class="projects__title"><span>${project.data.projectName}</span></div>
                    <div class="projects__link">
                      <a href=${project.data.projectLink} class="projects__link-btn">
                        <div class="link__container">
                          <img src="../img/Projectbtn.png" />
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
  })

// SEARCH PROJECT

document.getElementById("searchBtn").addEventListener("click", (event) => {
  event.preventDefault()
  const searchkeyword = document.getElementById("search").value

  db.collection("Projects")
    .orderBy("timestamp", "desc")
    .onSnapshot((project) => {
      const data = project.docs.map((doc) => ({ id: doc.id, data: doc.data() }))

      let searchResults
      if (searchkeyword !== "") {
        searchResults = data.filter((blog) => {
          return Object.values(blog.data)
            .join(" ")
            .toLocaleLowerCase()
            .includes(searchkeyword.toLocaleLowerCase())
        })
      }
      if (searchkeyword !== "") {
        console.log(searchResults.length)
        searchResults.length === 0
          ? (document.getElementById("projects__container").innerHTML = `
            <div style="margin-left:400px;text-align:center;">
            <div style="margin-bottom:20px; color:#28b485">Oops</div>
            <img style="width:400px;height:230px;" src="https://media4.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif?cid=6c09b9520be72e6b4a337dbb50fcd311a3f6b388c6354a4b&rid=giphy.gif&ct=g" alt="not found"></img>`)
          : (document.getElementById("projects__container").innerHTML =
              searchResults
                ?.map(
                  (project) =>
                    ` <div class="projects__card" key=${project.id}>
            <figure>
              <img
                src=${project.data.imageUrl}
              />
              <figcaption>
                <div class="project__overlay">
                  <div class="projects__description">
                    <span class="project__price">${project.data.projectPrice} $</span>
                    <div class="projects__title"><span>${project.data.projectName}</span></div>
                    <div class="projects__link">
                      <a href=${project.data.projectLink} class="projects__link-btn">
                        <div class="link__container">
                          <img src="../img/Projectbtn.png" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>`
                )
                .join(""))
      } else {
        document.getElementById("projects__container").innerHTML = data
          ?.map(
            (project) =>
              ` <div class="projects__card" key=${project.id}>
            <figure>
              <img
                src=${project.data.imageUrl}
              />
              <figcaption>
                <div class="project__overlay">
                  <div class="projects__description">
                    <span class="project__price">${project.data.projectPrice} $</span>
                    <div class="projects__title"><span>${project.data.projectName}</span></div>
                    <div class="projects__link">
                      <a href=${project.data.projectLink} class="projects__link-btn">
                        <div class="link__container">
                          <img src="../img/Projectbtn.png" />
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
      }
    })
})
