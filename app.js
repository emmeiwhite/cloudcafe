const cafeForm = document.querySelector(".add-cafe-form");

cafeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const cafeName = cafeForm.cafeName.value;
  const cafeCity = cafeForm.cafeCity.value;
  console.log(cafeName);
  console.log(cafeCity);
});
