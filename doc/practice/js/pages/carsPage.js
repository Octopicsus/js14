import { cleanPage, showError } from "../helpers/domHelpers.js"
import { cars } from "../data.js";
import { isCarEditFormValid } from "../helpers/validators.js";

export const showCarsPage = () => {
  cleanPage();
  
  const parent = document.querySelector('#root');
  const carsPage = document.createElement('div');
  carsPage.classList.add('cars-page');

  const carsGrid = generateCarsGrid(carsPage);
  carsPage.appendChild(carsGrid);

  const infoBlock = document.createElement('div');
  infoBlock.classList.add('cars-info-block');

  carsPage.appendChild(infoBlock);
  parent.appendChild(carsPage);
}

function generateCarsGrid() {
  const carsWrapper = document.createElement('div');
  carsWrapper.classList.add('cars-wrapper');

  carsWrapper.innerHTML = `
      <div>Brand</div>
      <div>Model</div>
      <div>Type</div>
      <div>Price</div>
      <div>Actions</div>
  `;

  cars.forEach(car => {
    carsWrapper.innerHTML += `
      <div>${car.brand}</div>
      <div>${car.model}</div>
      <div>${car.type}</div>
      <div>${car.price}</div>
      <div data-id="${car.id}">
        <button type="button" data-action="view">View</button>
        <button type="button" data-action="edit">Edit</button>
        <button type="button" data-action="delete">Delete</button>
      </div>
    `;
  });

  carsWrapper.addEventListener('click', event => {
    if(event.target.nodeName === 'BUTTON') {
      const action = event.target.getAttribute('data-action');
      const id = event.target.parentNode.getAttribute('data-id');

      if (action === 'view') {
        viewCar(id);
      } else if (action === 'edit') {
        editCar(id);
      } else if (action === 'delete'){
        const isUserConfirms = confirm('Are you sure you wanna remove this car?');
        if (isUserConfirms) {
          deleteCar(id);
        }
      }
    }
  });

  return carsWrapper;
}


function viewCar(carId) {
  // todo: consider about moving this code to separate common function
  const parent = document.querySelector('.cars-info-block');
  const targetCar = cars.find(car => car.id === carId);
  if (!targetCar) {
    return;
  }

  parent.innerHTML = `
    <div>${targetCar.brand}</div>
    <div>${targetCar.model}</div>
    <div>${targetCar.type}</div>
    <div>${targetCar.price}</div>
    <div>${targetCar.description}</div>
  `;
}

function editCar(carId) {
  const parent = document.querySelector('.cars-info-block');
  const targetCar = cars.find(car => car.id === carId);
  if (!targetCar) {
    return;
  }

  parent.innerHTML = `
    <form name="editCar">
      <div>
        <input type="text" name="brand" value="${targetCar.brand}" />
        <span class="hidden error brand-error"></span>
      </div>
      <div>
        <input type="text" name="model" value="${targetCar.model}" />
        <span class="hidden error model-error"></span>
      </div>
      <div>
        <input type="text" name="type" value="${targetCar.type}" />
        <span class="hidden error type-error"></span>
      </div>
      <div>
        <input type="text" name="price" value="${targetCar.price}" />
        <span class="hidden error price-error"></span>
      </div>
      <div>
        <textarea name="description">${targetCar.description}</textarea>
        <span class="hidden error description-error"></span>
      </div>
      <div>
        <button type="button" class="save-car">Save</button>
      </div>
    </form>
  `;

  document.querySelector('.save-car').addEventListener('click', () => {
    const form = document.forms.editCar;
    
    // todo: optimize this code
    const data = {
      brand: form.brand.value,
      model: form.model.value,
      type: form.type.value,
      price: form.price.value,
      description: form.description.value,
    };

    if (!isCarEditFormValid(data)) {
      showError('Incorrect edit car form data');
      return;
    }

    // todo: optimize this code
    targetCar.brand = data.brand;
    targetCar.model = data.model;
    targetCar.type = data.type;
    targetCar.price = data.price;
    targetCar.description = data.description;

    // todo: optimize this code
    form.brand.value = '';
    form.model.value = '';
    form.type.value = '';
    form.price.value = '';
    form.description.value = '';

    parent.classList.add('hidden');
    
    // not the best option, but to be refactored in the future
    showCarsPage();
  })
}

function deleteCar(carId) {
  const carIndex = cars.findIndex(car => car.id === carId);
  if (carIndex === -1) {
    return;
  }

  cars.splice(carIndex, 1);
  showCarsPage();
}