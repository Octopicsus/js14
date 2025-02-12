const root = document.getElementById("root");

function createButton(text) {
  const button = document.createElement("button");
  button.classList.add(`${text}-btn`);
  button.id = text;
  button.textContent = text.toUpperCase();
  return button;
}

function showNavigation() {
  const navigation = document.createElement("nav");

  const charactersBtn = createButton("people");
  const planetsBtn = createButton("planets");
  const starshipsBtn = createButton("starships");

  navigation.appendChild(charactersBtn);
  navigation.appendChild(planetsBtn);
  navigation.appendChild(starshipsBtn);

  root.appendChild(navigation);
}

function responseApi(type) {
  fetch(`https://swapi.dev/api/${type}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      fetch(data.next)
        .then((response) => response.json())
        .then((data) => console.log(data.results));
    });
}

document.addEventListener("DOMContentLoaded", () => {
  showNavigation();

  document.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      const selectedButton = document.querySelector("button.selected");

      if (selectedButton) {
        selectedButton.classList.remove("selected");
      }
      event.target.classList.add("selected");

      responseApi(event.target.id);
    }
  });
});
