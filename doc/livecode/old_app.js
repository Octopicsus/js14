document.querySelector(".my-btn").addEventListener("click", () => {
//   const userName = document.forms[0].github_user.value;
//   if (!userName) {
//     return;
//   }

//   fetch(`https://api.github.com/users/${userName}`)
//     .then((response) => response.json())
//     .then((response) => {
//       const avatar = response.avatar_url;
//       const img = document.createElement("img");
//       img.src = avatar;
//       img.width = 100;
//       img.height = 100;
//       document.body.appendChild(img);
//     });


// fetch('https://jsonplaceholder.typicode.com/posts')
//   .then(response => response.json())
//   .then(posts => {
//     posts.forEach(post => {
//       generatePost(post, document.body)
//     })
//   })


// fetch('https://fakestoreapi.com/products')
//   .then(response => response.json())
//   .then(data => console.log(data));

fetch('https://swapi.dev/api/people')
  .then(response => response.json())
  .then(data => {
    console.log('People: ', data.results)
  });

});


function generatePost(post, parent) {
  const element = document.createElement('div');
  element.innerHTML = `
  <h2>${post.title}</h2>
  <p>${post.body}</p>
  `

  parent.appendChild(element);
}

