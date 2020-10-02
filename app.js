const cafeForm = document.querySelector("#cafe-form");
const cafeList = document.querySelector(".cafe-lists");

// 1) Form Submit
cafeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const cafeName = cafeForm.cafeName.value;
  const cafeCity = cafeForm.cafeCity.value;

  const htmlElement = `<li class="cafe-info"> 
      <div class="cafe-details">
        <h4>${cafeName}</h4>
        <p>${cafeCity}</p>
      </div>

      <span class="delete-cafe">X</span>
  </li>`;

  cafeList.innerHTML += htmlElement;
  cafeForm.reset();
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
