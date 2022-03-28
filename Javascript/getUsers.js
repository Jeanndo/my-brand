const getUsers = async () => {
  try {
    const response = await fetch(
      "https://my-brand-codemoon.herokuapp.com/api/v1/users",
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

    const users = await response.json()
    console.log(users.data.data)

    document.getElementById("users__table").innerHTML = ` <table>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
               ${users.data.data
                 .map(
                   (user) =>
                     `<tr key=${user._id}>
                   <td>${user.firstName}</td>
                   <td>${user.lastName}</td>
                   <td>${user.role}</td>
                   <td>${user.email}</td>
                   <td>
                     <span class="material-icons"> edit </span>
                   </td>
                   <td>
                     <span class="material-icons"> delete </span>
                   </td>
                 </tr>`
                 )
                 .join("")}
              </table>
              `
  } catch (error) {
    console.log(error)
  }
}

getUsers()
