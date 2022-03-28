// @ts-nocheck

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

// RECOMMENDED BLOGS

const fetchRecommendedBlogs = async () => {
  try {
    const response = await fetch(
      `https://my-brand-codemoon.herokuapp.com/api/v1/blogs`
    )
    const blogs = await response.json()
    console.log(blogs.data.data)
    document.getElementById("recommended").innerHTML = blogs?.data?.data
      ?.map(
        (blog) =>
          `<div class="recommended__card">
          <a href="">
            <img
              src=${blog?.blogImage}
              alt=""
            />
          </a>
        </div>`
      )
      .sort()
      .join("")
  } catch (error) {
    console.log(error)
  }
}
fetchRecommendedBlogs()

const fetchSingleBlog = async () => {
  let params = new URLSearchParams(window.location.search)
  let blogId = params.get("id")

  console.log(blogId)
  try {
    const response = await fetch(
      `https://my-brand-codemoon.herokuapp.com/api/v1/blogs/${blogId}`
    )
    const blog = await response.json()
    console.log(blog.data.data)
    document.getElementById(
      "main__blog"
    ).innerHTML = ` <h1 class="container__primary-heading">Learn with me!</h1>
      <div class="container__full-blog">
        <div class="container__blog__image">
          <div>
            <img
              src=${blog.data.data.blogImage}
            />
          </div>
          <div class="related__post">
            <a href="#" class="recommended__tiltle">
              <img
                class="related__post-img"
                 src=${blog.data.data.blogImage}
                alt=""
              />
              <strong> Recommended is Synergy west power?</strong>
            </a>
          </div>
        </div>
      </div>
      <div class="container__blogs-description">
        <h1 class="container__blogs-description-heading">
         ${blog?.data?.data?.title}
        </h1>
        <p class="container__blogs-description-paragraph">
        ${blog?.data?.data?.description}
        </p>
        <div class="blogs__actions">
          <div class="blogs__author"><span>Author:${
            blog?.data?.data?.author
          }</span></div>
          <div class="blogs__comments">
            <h4 class="blogs__comment-label">Comments</h4>
            <figure id="commentsbtn">
              <img src="../img/greencomment.png" alt="comment" />
              <figcaption>
                <span class="blogs__comments-number">${
                  blog.data.data.comments.length
                }</span>
              </figcaption>
            </figure>
            <div class="blogs__comment-like">
              <div id="like__btn">
                <span class="material-icons like" > thumb_up_off_alt </span>
                <span class="like__number">${
                  blog?.data?.data?.likes?.length
                }</span>
              </div>
              <div id="dislike__btn">
                <span class="material-icons dislike" > thumb_down_off_alt </span>
                <span class="dislike__number">${
                  blog?.data?.data?.disLikes.length
                }</span>
              </div>
            </div>
          
          </div>
        </div>
        <div class="comments__list" id="comments__list">
         
        
        ${blog.data.data.comments
          .map(
            (comment) =>
              `<div class="comment__container" key=${comment._id}>
            <div class="user__info">
              <div class="user__image">
                <img
                  src="https://avatars.githubusercontent.com/u/59208992?v=4"
                  alt=""
                />
              </div>
              <div class="user__name">${comment.author.firstName}</div>
              <div class="posted__at">
                <strong>
                <span class="PostedTime">Posted:${moment(
                  comment.CreatedAt
                ).fromNow()}</span></strong>
              </div>
            </div>
            <div class="comments__list__items">
              <p>${comment?.comment}</p>
            </div>
          </div>`
          )
          .join("")}
          <div class="expandless">
            <button class="expand__btn" id="expand">
              <strong> Expand Less</strong>
              <strong><span class="material-icons"> expand_less </span></strong>
            </button>
          </div>
        </div>
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
              <button class="comment__btn" id="addComment">Comment</button>
            </div>
          </form>
        </div>
        <div class="share__buttons__container"> 
         share by:
        <div id="share" class="share_btns"></div>
        </div>
        
      </div>`

    $("#share").jsSocials({
      text: "Do you want to learn coding? codemoon is the best place I ever know👩🏻‍💻.\n",
      shares: [
        "email",
        "twitter",
        "facebook",
        "googleplus",
        "linkedin",
        "pinterest",
        "whatsapp",
      ],
    })
    // SHOW COMMENTS

    const comments = document.getElementById("commentsbtn")
    comments.addEventListener("click", showComments)

    //  HIDE COMMENTS

    const hideBtn = document.getElementById("expand")
    hideBtn.addEventListener("click", hideComments)

    function showComments() {
      document.getElementById("comments__list").style.display = "block"
    }

    function hideComments() {
      document.getElementById("comments__list").style.display = "none"
    }

    // COMMENT ON BLOG

    document
      .getElementById("addComment")
      .addEventListener("click", async (event) => {
        event.preventDefault()

        const body = {
          comment: document.getElementById("comment").value,
        }

        await fetch(
          `https://my-brand-codemoon.herokuapp.com/api/v1/blogs/${blogId}/comments`,
          {
            method: "POST",
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
      })

    document
      .getElementById("like__btn")
      .addEventListener("click", async (event) => {
        event.preventDefault()
        const likes = await fetch(
          `https://my-brand-codemoon.herokuapp.com/api/v1/blogs/like/${blogId}`,
          {
            method: "PATCH",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("token")).token
              }`,
            },
          }
        )

        const data = await likes.json()
        console.log(data)
      })

    document
      .getElementById("dislike__btn")
      .addEventListener("click", async (event) => {
        event.preventDefault()
        const dislikes = await fetch(
          `https://my-brand-codemoon.herokuapp.com/api/v1/blogs/dislike/${blogId}`,
          {
            method: "PATCH",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("token")).token
              }`,
            },
          }
        )

        const data = await dislikes.json()
        console.log(data)
      })
  } catch (error) {
    console.log(error)
  }
}

fetchSingleBlog()

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
