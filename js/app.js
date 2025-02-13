const root = document.getElementById("root");
let itemUrl = "";

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

function showList() {
  const parent = document.createElement("div");

  const list = document.createElement("div");
  list.classList.add("items-list");

  const loadMore = createButton("load");
  loadMore.classList.add("load-btn");

  parent.appendChild(list);
  parent.appendChild(loadMore);
  root.appendChild(parent);
}

function clearContent() {
  const list = document.querySelector(".items-list");
  list.innerHTML = "";
}

function responseApi(type) {
  if (type) {
    itemUrl = `https://swapi.dev/api/${type}`;
    clearContent();
  }

  const loadBtn = document.querySelector(".load-btn");

  fetch(itemUrl)
    .then((response) => response.json())
    .then((data) => {
      itemUrl = data.next;

      if (data.next) {
        loadBtn.classList.add("show");
      } else {
        loadBtn.classList.remove("show");
      }
      showItems(data.results, type);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    });
}

function showItems(data, type) {
  const parent = document.querySelector(".items-list");

  data.forEach((item) => {
    const element = document.createElement("p");
    element.textContent = item.name;
    element.addEventListener("click", () => showPopup(item, type));
    parent.appendChild(element);
  });
}

function showPopup(item, type) {
  const overlay = document.querySelector(".overlay");
  const popup = document.querySelector(".popup");

  overlay.classList.add("active");
  popup.classList.add("active");

  popup.innerHTML = `<h2>${item.name}</h2>`;

  fetch(item.url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let details = [];

      if (type === "people") {
        details = [
          { label: "Homeworld", value: data.homeworld },
          { label: "Gender", value: data.gender },
          { label: "Height", value: data.height },
          { label: "Mass", value: data.mass },
          { label: "Birth Year", value: data.birth_year },
          { label: "Starships", value: data.starships.join(", ") },
          { label: "Films", value: data.films.join(", ") },
        ];
      } else if (type === "planets") {
        details = [
          { label: "Population", value: data.population },
          { label: "Diameter", value: data.diameter },
          { label: "Rotation Period", value: data.rotation_period },
          { label: "Climate", value: data.climate },
          { label: "Terrain", value: data.terrain },
          { label: "Gravity", value: data.gravity },
          { label: "Surface Water", value: data.surface_water },
        ];
      } else if (type === "starships") {
        details = [
          { label: "Model", value: data.model },
          { label: "Manufacturer", value: data.manufacturer },
          { label: "Passengers", value: data.passengers },
          { label: "Credits", value: data.cost_in_credits },
          { label: "Length", value: data.length },
          { label: "Starship Class", value: data.starship_class },
          {
            label: "Max Speed",
            value: data.max_atmosphering_speed,
          },
        ];
      }

      details.forEach(({ label, value }) => {
        const detailElement = document.createElement("h5");
        detailElement.textContent = `${label}: ${value}`;
        popup.appendChild(detailElement);
      });
    });
}

function generateOverlay() {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  const popup = document.createElement("div");
  popup.classList.add("popup");

  root.appendChild(overlay);
  root.appendChild(popup);

  overlay.addEventListener("click", () => {
    overlay.classList.remove("active");
    popup.classList.remove("active");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  showNavigation();
  showList();
  generateOverlay();

  document.addEventListener("click", (event) => {
    if (
      event.target.tagName === "BUTTON" &&
      event.target.parentElement.tagName === "NAV"
    ) {
      const selectedButton = document.querySelector("button.selected");

      if (selectedButton) {
        selectedButton.classList.remove("selected");
      }

      event.target.classList.add("selected");
      responseApi(event.target.id);
    } else if (event.target.classList.contains("load-btn")) {
      responseApi();
    }
  });
});
