let peopleUrl = 'https://swapi.dev/api/people';
document.addEventListener('DOMContentLoaded', () => {
  loadPeople();
});

document.querySelector('.load-more').addEventListener('click', () => {
  loadPeople();
});

function loadPeople() {
  fetch(peopleUrl)
    .then(response => response.json())
    .then(data => {
      peopleUrl = data.next;
      if (data.next) {
        document.querySelector('.load-more').classList.remove('hidden');
      } else {
        document.querySelector('.load-more').classList.add('hidden');
      }
      showPeople(data.results);
    });
}

/**
 * 
 * @param {Array[]} data 
 */
function showPeople(data) {
  const parent = document.querySelector('.people .data');

  data.forEach(person => {
    const element = document.createElement('div');
    element.textContent = `Name: ${person.name} | Gender: ${person.gender} | Data of birth: ${person.birth_year}`;
    parent.appendChild(element);
  })
}