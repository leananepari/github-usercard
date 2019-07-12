// Using axios, send GET request to Github users api, using my Github username
// API: https://api.github.com/users/<your name>

let mainUsername = 'leananepari';

axios.get(`https://api.github.com/users/${mainUsername}`)
  .then(response => {
    buildCard(response.data);
    return response;
  })
  .then(response => {
    //Call getFollowers function to handle getting followers data
    getFollowers(response.data);
  })
  .catch(error => {
    console.log(error)
  })

// const friendsArray = ['leananepari', 'jondscott21', 'Bigorange8801', 'paintedlbird7', 'cmstexas', 'sethnadu', 'davindar'];

//Iterate over followers-url response and for each make another get request to get all the needed data for each user
//pass that data to build card function
function getFollowers(obj) {
  axios.get(`${obj.followers_url}`)
    .then(response => {
      response.data.forEach(item => {
        axios.get(`${item.url}`)
          .then(response => {
            buildCard(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      })
    })
    .catch(error => {
      console.log(error)
    })
}   

/* How Card element should look like:

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

//Build Card element using the structure above
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

/* ------------------------------------------------------------------------------*/
  //Handle adding a contribution graph under the main username. Plus, additional couple of elements 

  //Use following githubchart api (github link: https://github.com/2016rshah/githubchart-api)
  //API url to use as an image src: <img src="http://ghchart.rshah.org/<username>" />
  let container = document.createElement('div');

  let githubUserTitle = document.createElement('h1');
  githubUserTitle.textContent = `GitHub user: ${obj.name}`;
  githubUserTitle.className = 'github-user';

  let contributionsTitle = document.createElement('h2');
  contributionsTitle.textContent = 'Contributions';
  contributionsTitle.className = 'contributions-title';

  let contributionGraph = document.createElement('img');
  contributionGraph.className = 'graph';
  contributionGraph.src = `http://ghchart.rshah.org/${mainUsername}`;

  let followersTitle = document.createElement('h2');
  followersTitle.textContent = 'Followers: '
  followersTitle.className = 'followers-title';

  if(obj.login === mainUsername) {
    container.appendChild(githubUserTitle);
    container.appendChild(card);
    container.appendChild(contributionsTitle);
    container.appendChild(contributionGraph);
    container.appendChild(followersTitle);
    return document.querySelector('.cards').appendChild(container);
  }
/* ----------------------------------------------------------------------*/
  
  return document.querySelector('.cards').appendChild(card);
}

