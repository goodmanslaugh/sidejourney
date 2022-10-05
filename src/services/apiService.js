const BASE_URL = "https://api.github.com/users/";

export const apiService = (() => {
  // function that takes input of username and fetchs the data
  const fetchUsers = (username) => {
    return fetch(`${BASE_URL}${username}`).then((res) => res.json());
  };

  const fetchUserRepos = (username) => {
    return fetch(`${BASE_URL}${username}/repos`).then((res) => res.json());
  };

  return { fetchUsers, fetchUserRepos };
})();
