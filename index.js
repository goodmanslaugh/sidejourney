const BASEURL = "https://api.github.com/users/";
async function getUser(username) {
  const resp = await fetch(BASEURL + username);
  const respData = await resp.json();

  getRepos(username);
}
async function getRepos(username) {
  const resp = await fetch(BASEURL + username + "/repos");
  const respData = await resp.json();
  console.log(respData);
}
