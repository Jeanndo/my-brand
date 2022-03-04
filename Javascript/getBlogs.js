// @ts-nocheck
db.collection("blogs")
  .orderBy("timestamp", "desc")
  .onSnapshot((blogs) => {
    const data = blogs.docs.map((doc) => ({ data: doc.data(), id: doc.id }))
    console.log("blog", data)
    document.getElementById("blog").innerHTML = data
      ?.map(
        (blog) => `<div class="blogs__container" key=${blog.id}>
                <div class="blog__card-description">
                  <h4 class="blog__title"id="Jeanndo">${blog.data.Title}  
                     <span class="PostedTime">${moment(
                       blog.data.CreatedAt
                     ).fromNow()}</span>
                    </h4>
             
                  <p class="blogs__description" id="paragraph">
                   ${blog.data.Blog.substr(0, 300)}
                   ...
                  </p>
                  <div class="blogs__actions">
                    <div class="blogs__author"><span>Author</span></div>
                    <div class="blogs__author__name"><span>
                    ${blog.data.Author}</span></div>
                    <button class="edit__btn btn" id="edit__btn"onclick="getBlogToUpdate('${
                      blog.id
                    }')">
                      <span class="material-icons"> edit </span>
                    </button>
                    <button class="delete__btn btn" id="delete__btn" onclick="deleteBlog('${
                      blog.id
                    }')">
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

// GET ID OF THE BLOG TO BE UPDATED

function getBlogToUpdate(id) {
  localStorage.setItem("blogToUpdate", JSON.stringify({ id }))
  db.collection("blogs")
    .doc(id)
    .get()
    .then((doc) => {
      document.getElementById("Title").value = doc.data().Title
      tinymce.activeEditor.setContent(doc.data().Blog)
      document.getElementById("update__blog_btn").style.display = "inline-block"
    })
    .catch((error) => {
      console.log(error)
    })
}

// UPDATE BLOG

document
  .getElementById("update__blog_btn")
  .addEventListener("click", updateBlog)

// UPDATE BLOG FUNCTION

function updateBlog(event) {
  event.preventDefault()
  const id = JSON.parse(localStorage.getItem("blogToUpdate")).id

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
          .doc(id)
          .set(
            {
              Title: Title,
              ImageUrl: downloadedImage,
              Blog: BlogText,
              CreatedAt: Date.now(),
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            },
            {
              merge: true,
            }
          )
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

// DELETING A BLOG

function deleteBlog(id) {
  db.collection("blogs")
    .doc(id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!")
    })
    .catch((error) => {
      console.error("Error removing document: ", error)
    })
}
