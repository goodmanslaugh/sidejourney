<template>
  <div class="c-git-card">
    <div v-if="userDetails && !!userDetails.avatar_url">
      <figure class="image is-128x128 mr-4">
        <img
          class="is-rounded"
          :src="userDetails.avatar_url"
          alt="user-image"
        />
      </figure>
    </div>
    <div class="user-info">
      <h1 class="user-name">{{ userDetails.name }}</h1>
      <p class="user-bio">{{ userDetails.bio }}</p>
      <div class="user-stats my-2 is-flex is-justify-content-space-between">
        <div class="stat followers">
          <p>{{ userDetails.followers || 0 }} Followers</p>
        </div>
        <div class="stat following">
          <p>{{ userDetails.following || 0 }} Following</p>
        </div>
        <div class="stat repos">
          <p>{{ userDetails.public_repos || 0 }} Repos</p>
        </div>
      </div>
      <div
        class="user-repos is-flex is-flex-wrap-wrap"
        v-if="userRepos.length > 0"
      >
        <div class="repo" v-for="repo in getUserRepos" :key="repo.id">
          <a :href="repo.html_url" class="repo-link" target="_blank">
            {{ repo.name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "c-git-card",
  props: {
    userDetails: Object,
    userRepos: Array,
  },
  computed: {
    getUserRepos() {
      const self = this;
      return self.userRepos.slice(0, 9);
    },
  },
};
</script>
<style scoped>
.c-git-card {
  background-color: #4c2885;
  background-image: linear-gradient(315deg, #4c2885 0%, #4c11ac 100%);
  border-radius: 20px;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 2.2rem;
  align-items: center;
  max-width: 800px;
  color: white;
  margin: 30px 0;
}

.c-git-card .user-info .user-name {
  font-size: 24px;
  font-weight: 700;
}
.c-git-card .user-info .user-stats .stat {
  min-width: 120px;
}
.c-git-card .user-info .user-repos .repo {
  margin: 5px;
  font-size: 12px;
  background-color: #2a2a72;
  border-radius: 5px;
  padding: 5px;
}

.c-git-card .user-info .user-repos .repo .repo-link {
  color: white;
}
</style>
