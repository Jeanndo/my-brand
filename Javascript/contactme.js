// @ts-nocheck

// CONTACT ME

document
  .getElementById("contact__form")
  .addEventListener("submit", async (event) => {
    event.preventDefault()

    const body = {
      fullName: document.getElementById("contact__form").fullname.value,
      email: document.getElementById("contact__form").email.value,
      subject: document.getElementById("contact__form").subject.value,
      message: document.getElementById("contact__form").message.value,
    }

    try {
      const response = await fetch(
        "https://my-brand-codemoon.herokuapp.com/api/v1/messages",
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

      const messages = await response.json()
      console.log(messages)

      const { message, status } = messages
      Toastify({
        text: "Received with thanks",
        className: "info",
        position: "center",
        style: {
          background: "linear-gradient(to right, #FFA500, #fb923c)",
        },
      }).showToast()
    } catch (error) {
      console.log(error)
    }
    document.getElementById("contact__form").fullname.value = ""
    document.getElementById("contact__form").email.value = ""
    document.getElementById("contact__form").subject.value = ""
    document.getElementById("contact__form").message.value = ""
  })
