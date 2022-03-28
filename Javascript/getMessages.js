// @ts-nocheck
const getMessages = async () => {
  try {
    const response = await fetch(
      "https://my-brand-codemoon.herokuapp.com/api/v1/messages",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
      }
    )

    const messages = await response.json()
    console.log(messages.data.data)

    document.getElementById("messages__container").innerHTML = `<table>
  <tr>
    <th>Full Name</th>
    <th>Email</th>
    <th>Subject</th>
    <th>Message</th>
    <th>Delete</th>
  </tr>
  ${messages.data.data
    .map(
      (message) =>
        `<tr key=${message._id}>
      <td>${message.fullName}</td>
      <td>${message.email}</td>
      <td>${message.subject}</td>
      <th>${message.message}</th>
      <td onclick="deleteMessage('${message._id}')">
        <span class="material-icons"> delete </span>
      </td>
    </tr>
    `
    )
    .join("")}
  
</table>`
  } catch (error) {
    console.log(error)
  }
}

const deleteMessage = async (id) => {
  try {
    const response = await fetch(
      ` https://my-brand-codemoon.herokuapp.com/api/v1/messages/${id}`,
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

    const messages = await response.json()
    console.log(messages)

    if (messages.message) {
      Toastify({
        text: messages.message,
        className: "info",
        position: "center",
        style: {
          background: "linear-gradient(to right, red, #fb923c)",
        },
      }).showToast()
    }
  } catch (error) {
    console.log(error)
  }
}

getMessages()
