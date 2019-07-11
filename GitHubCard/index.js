/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

axios.get('https://api.github.com/users/leananepari')
  .then(response => {
    buildCard(response.data);
    return response;
  })
  .then(response => {
    getFollowers(response.data);
  })
  .catch(error => {
    console.log(error)
  })

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const friendsArray = ['leananepari', 'jondscott21', 'Bigorange8801', 'paintedlbird7', 'cmstexas', 'sethnadu', 'davindar'];

function getFollowers(obj) {
  axios.get(`${obj.followers_url}`)
    .then(response => {
      response.data.forEach(item => {
        axios.get(`${item.url}`)
          .then(response => {
            buildCard(response.data)
          })
      })
    })
}

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
function buildCard(obj) {
  //Create Card div container
  let card = document.createElement('div');
  card.className = 'card';

  //Create image element and assign given value to it
  let img = document.createElement('img');
  img.src = obj.avatar_url;

  //Create card-info container div
  let cardInfo = document.createElement('div');
  cardInfo.className = 'card-info';
    //Create all of its elements
    let name = document.createElement('h3');
    name.className = 'name';
    name.textContent = obj.name;

    let username = document.createElement('p');
    username.className = 'username';
    username.textContent = obj.login;

    let location = document.createElement('p');
    location.textContent = `Location: ${obj.location}`;

    let profile = document.createElement('p');
    let aTag = document.createElement('a');
    profile.textContent = 'Profile: ';
    aTag.href = obj.html_url;
    aTag.textContent = obj.html_url;
    profile.appendChild(aTag);

    let followers = document.createElement('p');
    followers.textContent = `Followers: ${obj.followers}`;

    let following = document.createElement('p');
    following.textContent = `Following: ${obj.following}`;

    let bio = document.createElement('p');
    bio.textContent = `Bio: ${obj.bio}`

    //Append to card-info
    cardInfo.appendChild(name);
    cardInfo.appendChild(username);
    cardInfo.appendChild(location);
    cardInfo.appendChild(profile);
    cardInfo.appendChild(followers);
    cardInfo.appendChild(following);
    cardInfo.appendChild(bio);

  //Append img and card-info to card
  card.appendChild(img);
  card.appendChild(cardInfo);

  return document.querySelector('.cards').appendChild(card);
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
