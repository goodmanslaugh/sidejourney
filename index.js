const BASEURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const xssTags = {
    "\"": "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
    "<": "&lt;",
    ">": "&gt;"
};
function xssEscape(str) {
    return str.replace(/["'/<>]/g, function(tag) {
        return xssTags[tag] || tag;
    });
}

async function getUser(username) {
  const resp = await fetch(BASEURL + username);
  const respData = await resp.json();

  createUserCard(respData);

  getRepos(username);
}

async function getRepos(username) {
  const resp = await fetch(BASEURL + username + "/repos");
  const respData = await resp.json();

  addReposToCard(respData);
}

function createUserCard(user) {
  if (user.message) return userNotFound();
  if (!user.name) user.name = user.login; //if user has no name, use their username instead
  if (!user.bio) user.bio = "";
  user.name = xssEscape(user.name);
  user.bio = xssEscape(user.bio);
  const cardHTML = `
        <div class="card">
            <div>
                  <a href="${user.avatar_url}" download>
                      <img class="avatar" src="${user.avatar_url}" alt="${user.name}"/>
                  </a>
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul class="info">
                    <li>${user.public_repos}<strong>Repos</strong></li>
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                </ul>
                <br>
                <div id="repos"></div>
            </div>
        </div>
    `;

  
  
  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .forEach((repo) => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("repo");
      repo.name = xssEscape(repo.name);

      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = repo.name;

      reposEl.appendChild(repoEl);
    });
}

function userNotFound(){
  
    const notfoundcardHTML = `
          <div class="errCard">
            <div>
                <img class="avatar" src="errImage.png" 
                width="230" 
                height="230" />
            </div>
            <div class="errText">
                <h2>User not found</h2>
                <p>Write again or try again later</p>
                <ul class="info">
                    <li><strong></strong></li>
                    <li><strong></strong></li>
                    <li><strong></strong></li>
                </ul>
                <br>
                <div id="repos"></div>
            </div>
        </div>
      `;


    main.innerHTML = notfoundcardHTML;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = "";
  }
});
