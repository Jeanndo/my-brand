// @ts-nocheck
db.collection("Projects")
  .orderBy("timestamp", "desc")
  .onSnapshot((projetcs) => {
    const data = projetcs.docs.map((doc) => ({
      data: doc.data(),
      id: doc.id,
    }))
    console.log("Projects", data)
    document.getElementById("project__row").innerHTML = data
      .map(
        (project) =>
          `<div class="project__card" key=${project.id}>
                <img
                  src=${project.data.imageUrl}
                  alt=${project.data.projectName}
                />
                <div class="project__actions">
                  <button class="edit__btn btn" onclick="getProjectToUpdate('${project.id}')">
                    <span class="material-icons"> edit </span>
                  </button>
                  <button class="delete__btn btn" onclick="deleteProject('${project.id}')">
                    <span class="material-icons"> delete </span>
                  </button>
                </div>
              </div>
              `
      )
      .join("")
  })

// GET ID OF THE PROJECT TO BE UPDATED

function getProjectToUpdate(id) {
  localStorage.setItem("projectToUpdate", JSON.stringify({ id }))
  db.collection("Projects")
    .doc(id)
    .get()
    .then((doc) => {
      document.getElementById("projectName").value = doc.data().projectName
      document.getElementById("project__price").value = doc.data().projectPrice
      document.getElementById("project__link").value = doc.data().projectLink
      document.getElementById("update__project_btn").style.display =
        "inline-block"
    })
}

// UPDATE PROJECT

document
  .getElementById("update__project_btn")
  .addEventListener("click", updateProject)

// UPDATE PROJECT FUNCTION

function updateProject(event) {
  event.preventDefault()
  const id = JSON.parse(localStorage.getItem("projectToUpdate")).id

  const Image_url = document.getElementById("image_url").files[0]
  const imageName = Image_url.name
  const projectRef = firebase.storage().ref(`Projects/${imageName}`)

  const uploadTask = projectRef.put(Image_url)
  const project__name = document.getElementById("projectName").value
  const project__price = document.getElementById("project__price").value
  const project__link = document.getElementById("project__link").value

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      document.getElementById("uploading__project__process").innerHTML =
        "Upload is " + progress + "% done"

      switch (snapshot.state) {
        case firebase.storage.TaskState.paused:
          console.log("uplaoding paused")
          break
        case firebase.storage.TaskState.running:
          console.log("uploading is running")
          break
      }
    },
    (error) => {
      console.log(error)
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadedImage) => {
        db.collection("Projects")
          .doc(id)
          .set(
            {
              imageUrl: downloadedImage,
              projectName: project__name,
              projectPrice: project__price,
              projectLink: project__link,
              CreatedAt: Date.now(),
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            },
            {
              merge: true,
            }
          )
          .then((project) => {
            console.log(project)
          })
          .catch((error) => {
            console.log(error)
          })
      })
    }
  )
}

// DELETE PROJECT FUNTION

function deleteProject(id) {
  db.collection("Projects")
    .doc(id)
    .delete()
    .then(() => {
      console.log("Project successfully removed!!")
    })
    .catch((error) => {
      console.error("Error removing document: ", error)
    })
  console.log(id)
}
