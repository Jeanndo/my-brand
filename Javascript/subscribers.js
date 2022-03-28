// @ts-nocheck
const getSubscribers = async () => {
  try {
    const response = await fetch(
      "https://my-brand-codemoon.herokuapp.com/api/v1/subscribe",
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

    const subscribers = await response.json()
    console.log(subscribers.data.data)

    document.getElementById("subscribers__container").innerHTML = `<table>
  <tr>
    <th>Email</th>
    <th>Delete</th>
  </tr>
 ${subscribers.data.data
   .map(
     (subscriber) =>
       ` <tr key=${subscriber._id}>
     <td>${subscriber.email}</td>
     <td onclick="deleteSubscribe('${subscriber._id}')">
       <span class="material-icons"> delete </span>
     </td>
   </tr>`
   )
   .join("")}
</table>`
  } catch (error) {
    console.log(error)
  }
}

getSubscribers()

const deleteSubscribe = async (id) => {
  try {
    const response = await fetch(
      `https://my-brand-codemoon.herokuapp.com/api/v1/subscribe/${id}`,
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
    const subscribers = await response.json()
    console.log(subscribers.message)
    if (subscribers.message) {
      Toastify({
        text: subscribers.message,
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
