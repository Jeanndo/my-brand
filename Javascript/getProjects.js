db.collection("Projects")
  .orderBy("timestamp", "desc")
  .onSnapshot((projetcs) => {
    const data = projetcs.docs.map((doc) => ({ data: doc.data(), id: doc.id }))

    console.log(data)
  })
