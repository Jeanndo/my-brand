// @ts-nocheck

const blogId = JSON.parse(localStorage.getItem("blogId")).id

// CREATE CONTACT MESSAGE

function createContact(event) {
  event.preventDefault()

  const fullname = document.getElementById("fullname")
  const email = document.getElementById("email")
  const subject = document.getElementById("subject")
  const message = document.getElementById("message")

  db.collection("contactMessage")
    .add({
      Name: fullname.value,
      Email: email.value,
      Subject: subject.value,
      Message: message.value,
    })
    .then((message) => {
      console.log(message)
    })
    .catch((error) => {
      console.log(error)
    })
  fullname.value = ""
  email.value = ""
  subject.value = ""
  message.value = ""
}

// GET A SINGLE BLOG

db.collection("blogs")
  .doc(blogId)
  .get()
  .then((doc) => {
    const data = {
      id: doc.id,
      data: doc.data(),
    }

    db.collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((comment) => {
        const Blogcomments = comment.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))

        let numOfComments = 0

        for (let i = 0; i < Blogcomments.length; i++) {
          if (data.id === Blogcomments[i].data.blogId) {
            numOfComments += 1
          }
          continue
        }
        document.getElementById(
          "main__blog"
        ).innerHTML = `<h1 class="container__primary-heading">Learn with me!</h1>
      <div class="container__full-blog">
        <div class="container__blog__image">
          <div>
            <img
              src=${data.data.ImageUrl}
            />
          </div>
          <div class="related__post">
            <a href="#" class="recommended__tiltle">
              <img
                class="related__post-img"
                src="https://cdn.pixabay.com/photo/2017/07/20/04/38/fantasy-2521221_960_720.jpg"
              />
              <strong> Recommended is Synergy west power?</strong>
            </a>
          </div>
        </div>
      </div>
      <div class="container__blogs-description">
        <h1 class="container__blogs-description-heading">
         ${data.data.Title}
         <span class="PostedTime">Posted:${moment(
           data.data.CreatedAt
         ).fromNow()}</span>
        </h1>
        <p class="container__blogs-description-paragraph">
           ${data.data.Blog}
        </p>
        <div class="blogs__actions">
          <div class="blogs__author"><span>Author:Jeanndo</span></div>
          <div class="blogs__comments">
            <h4 class="blogs__comment-label">Comments</h4>
            <figure id="commentsbtn">
              <img src="../img/greencomment.png" alt="comment" />
              <figcaption>
                <span class="blogs__comments-number">${numOfComments}</span>
              </figcaption>
            </figure>
            <div class="blogs__comment-like">
              <div id="likeNumber">
                <span class="material-icons like"> thumb_up_off_alt </span>
                <span class="like__number">1k</span>
              </div>
              <div id="dislikeNumber">
                <span class="material-icons dislike"> thumb_down_off_alt </span>
                <span class="dislike__number">50</span>
              </div>
            </div>
            <span class="material-icons share__btn"> share </span>
          </div>
        </div>
       ${
         blogId === data.id
           ? `<div class="comments__list" id="comments__list">
             ${Blogcomments.map(
               (comment) =>
                 `
                 <div class="comment__container" key=${comment.id}>
                <div class="user__info">
                ${
                  comment.data.blogId === data.id
                    ? ` <div class="user__image">
                 <img
                   src="https://media-exp1.licdn.com/dms/image/C4D03AQHfiJUDxoQhgw/profile-displayphoto-shrink_800_800/0/1603820615070?e=1650499200&v=beta&t=8oRTmlTiTdQAxrbFpvqsMjjKRIu6bm2kfM33HnVL0jM"
                   alt=""
                 />
               </div>`
                    : ""
                }
                
               ${
                 comment.data.blogId === data.id
                   ? `<div class="user__name">${comment.data.author}</div>`
                   : ""
               }
               ${
                 comment.data.blogId === data.id
                   ? `<div class="posted__at">
                     <strong>
                       Posted:${moment(comment.data.CreatedAt).fromNow()}
                     </strong>
                   </div>`
                   : ""
               }
               
             </div>
             <div class="comments__list__items">
             ${
               comment.data.blogId === data.id
                 ? `<p>${comment.data.comments}</p>`
                 : ""
             }
             </div>
           </div>`
             ).join("")}
             <div class="expandless">
               <button class="expand__btn" id="expand">
                 <strong> Expand Less</strong>
                 <strong>
                   <span class="material-icons"> expand_less </span>
                 </strong>
               </button>
             </div>
          </div>
          `
           : ""
       }
        <div class="comment__box">
          <form>
            <textarea
              class="message__box"
              placeholder="Your comment please!"
              id="comment"
              name="message"
              cols="30"
              rows="10"
              required
            ></textarea>
            <div>
              <button class="comment__btn" type="submit" id="addComment">Comment</button>
            </div>
          </form>
        </div>
      </div>`

        // LIKE
        document.getElementById("likeNumber").addEventListener("click", () => {
          db.collection("blogs")
            .doc(data.id)
            .set(
              {
                Like: doc.data()?.Like.push(data.id),
              },
              {
                merge: true,
              }
            )

          console.log(doc.data())
        })

        //DISLIKE
        document
          .getElementById("dislikeNumber")
          .addEventListener("click", () => {
            db.collection("blogs")
              .doc(data.id)
              .set(
                {
                  DisLike: doc.data()?.DisLike.push(data.id),
                },
                {
                  merge: true,
                }
              )
          })

        // CREATE A COMMENT ON BLOG

        document
          .getElementById("addComment")
          .addEventListener("click", createComment)

        function createComment(event) {
          event.preventDefault()

          const comment = document.getElementById("comment")

          db.collection("comments")
            .add({
              comments: comment.value,
              author: "Jado",
              blogId: data.id,
              CreatedAt: Date.now(),
              photo: "",
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((comment) => {
              console.log(comment)
            })
            .catch((error) => {
              const errorMessage = error.message
              console.log(errorMessage)
            })
          comment.value = ""
        }

        // TARGETING CONTACT BUTTON
        document
          .getElementById("contact__btn")
          .addEventListener("click", createContact)

        // SHOW COMMENTS

        const comments = document.getElementById("commentsbtn")
        comments.addEventListener("click", showComments)

        //  HIDE COMMENTS

        const hideBtn = document.getElementById("expand")
        hideBtn.addEventListener("click", hideComments)
      })
  })
  .catch((error) => {
    console.log(error)
  })

// SHOW AND HIDE COMMENTS

function showComments() {
  document.getElementById("comments__list").style.display = "block"
}

function hideComments() {
  document.getElementById("comments__list").style.display = "none"
}

// RECOMMENDED BLOGS

db.collection("blogs")
  .orderBy("timestamp", "desc")
  .onSnapshot((blog) => {
    const data = blog.docs.map((doc) => ({ id: doc.id, data: doc.data() }))

    document.getElementById("recommended").innerHTML = data
      .map(
        (blog) =>
          `<div class="recommended__card">
          <a href="">
            <img
              src=${blog.data.ImageUrl}
              alt=""
            />
          </a>
        </div>`
      )
      .join("")
  })
