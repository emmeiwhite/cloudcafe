const cafeForm = document.querySelector("#cafe-form");
const cafeList = document.querySelector(".cafe-lists");

const renderItems = (doc) => {
  const cafeCity = doc.data().cafecity;
  const cafeName = doc.data().cafename;
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

/** --- STEP-1) getting data || This is where the magic happens --- */
/*
db.collection("cafes")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      renderItems(doc);
    });
  });
*/

/** STEP 1) Making Queries to the back-end */
// db.collection("cafes")
//   .where("cafecity", "==", "srinagar")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       renderItems(doc);
//     });
//   });

// orderBy
/*
db.collection("cafes")
  .orderBy("cafecity")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      renderItems(doc);
    });
  });
*/
// Combining Queries

// db.collection("cafes")
//   .orderBy("cafename")
//   .where("cityname", "==", "srinagar")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       renderItems(doc);
//     });
//   });

// 1) Adding to the record to the DataBase document
cafeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  db.collection("cafes")
    .add({
      cafename: cafeForm.cafeName.value,
      cafecity: cafeForm.cafeCity.value,
    })
    .then(() => {
      console.log("Data Added Successfully !!!");
      cafeForm.reset();
    })
    .catch(() => console.log("ERROR: Adding code to the backend"));
});

// 2) Remove the Item using Event Delegation
cafeList.addEventListener("click", (e) => {
  if (e.target.className === "delete-cafe") {
    const docId = e.target.parentElement.getAttribute("data-id");
    db.collection("cafes").doc(docId).delete();
  }
});

// 0) Real Time Listeners :

db.collection("cafes").onSnapshot((snapshot) => {
  let changes = snapshot.docChanges();
  console.log(changes);
  changes.forEach((change) => {
    if (change.type == "added") {
      renderItems(change.doc);
    } else if (change.type == "removed") {
      console.log("Need to remove the same from the console");
      document.querySelector(`[data-id=${change.doc.id}]`).remove();
    }
  });
});
