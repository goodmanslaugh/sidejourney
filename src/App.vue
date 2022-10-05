<template>
  <div class="app">
    <c-app-header></c-app-header>
    <c-search-form @onSubmit="getUserInfo"></c-search-form>
    <c-git-card
      :user-details="userDetails"
      :user-repos="userRepos"
      v-if="userDetails && userRepos.length > 0"
    ></c-git-card>
    <h1
      v-else-if="userDetails?.message === 'Not Found'"
      class="error-message my-4 title"
    >
      User Not Found!
    </h1>
  </div>
</template>

<script>
import AppHeader from "./components/Header.vue";
import SearchForm from "./components/SearchForm.vue";
import GitCard from "./components/gitCard.vue";

import { apiService } from "./services/apiService";
import { ref } from "vue";

export default {
  name: "App",
  components: {
    cAppHeader: AppHeader,
    cSearchForm: SearchForm,
    cGitCard: GitCard,
  },
  setup() {
    const userDetails = ref(null);
    const userRepos = ref([]);
    return { userDetails, userRepos };
  },
  methods: {
    getUserInfo: function (username) {
      const self = this;

      const dataToBeFetch = [
        apiService.fetchUsers(username),
        apiService.fetchUserRepos(username),
      ];

      Promise.all(dataToBeFetch)
        .then(function (res) {
          // res[0] contains user details
          // res[1] contains array of repositories.

          self.userRepos = res[1];
          self.userDetails = res[0];
        })
        .catch(function (err) {
          alert(err);
        });
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-family: "Poppins", sans-serif;
  margin: 0;
  min-height: 100vh;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

#app .error-message {
  color: red;
  text-align: center;
}
</style>
