const cafeForm = document.querySelector("#cafe-form");
const cafeList = document.querySelector(".cafe-lists");

const renderItems = (doc) => {
  const cafeCity = doc.cafecity;
  const cafeName = doc.cafename;
  const docId = doc.id;

  const htmlElement = `<li data-id=${docId} class="cafe-info"> 
      <div class="cafe-details">
        <h4>${cafeName}</h4>
        <p>${cafeCity}</p>
      </div>

      <span class="delete-cafe">X</span>
  </li>`;
  cafeList.innerHTML += htmlElement;
};

/** --- STEP-1) CONNECTING TO DATABASE --- */
db.collection("cafes")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      renderItems(doc.data());
    });
  });

// 1) Adding to the record to the DataBase document
cafeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  db.collection("cafes")
    .add({
      cafename: cafeForm.cafeName.value,
      cafecity: cafeForm.cafeCity.value,
    })
    .then(() => console.log("Data Added Successfully !!!"))
    .catch(() => console.log("ERROR: Adding code to the backend"));
});

// 2) Remove the Item using Event Bubbling
cafeList.addEventListener("click", (e) => {
  console.log("Target Element is :");
  console.log(e.target.className);
  if (e.target.className === "delete-cafe") {
    e.target.parentElement.remove();
  } else {
    console.log("Other Child Element of Parent");
  }
});
