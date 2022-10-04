const API_URL = "https://api.github.com/users/";
async function getUser(username) {
  const resp = await fetch(API_URL + username);
  const respData = await resp.json();

  getRepos(username);
}
async function getRepos(username) {
  const resp = await fetch(API_URL + username + "/repos");
  const respData = await resp.json();
  console.log(respData);
}
