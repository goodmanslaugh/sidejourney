<template>
  <div class="c-search-form">
    <form class="my-3 box" @submit="handleSubmit($event)">
      <input
        type="text"
        class="input"
        placeholder="Search a Github user"
        v-model="searchText"
      />
    </form>
  </div>
</template>
<script>
import { reactive } from "vue";
import { eventsService } from "@/services/eventsService";

const searchVal = "";
export default {
  name: "c-search-form",
  setup() {
    const searchText = reactive(searchVal);
    return { searchText };
  },
  methods: {
    handleSubmit(e) {
      const self = this;
      e.preventDefault();
      self.$emit(eventsService.ON_SUBMIT, self.searchText);
    },
  },
};
</script>
<style></style>
