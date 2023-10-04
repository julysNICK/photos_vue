<template>
  <div>
    <h1>Search</h1>
    <form @submit.prevent="submitSearch">
      <div>
        <label for="name">Keyword</label>
        <br />
        <input type="text" v-model="keyword" name="keyword" id="keyword" class="form-field" />
      </div>
      <div>
        <input type="submit" value="Search" />
      </div>
    </form>
    <div v-for="p of photos" class="row" :key="p.id">
      <div>
        <img :src="p.photoFile" />
      </div>
      <div>{{ p.name }}</div>
      <div>{{ p.description }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SearchPage',
  data() {
    return {
      photos: [],
      keyword: ''
    }
  },
  methods: {
    async searchPhotos() {
      const { data } = await axios.get(`http://localhost:3000/photos?name_like=${this.$route.query.q}`);
      this.photos = data;
    },
    submitSearch() {
      this.$router.push({
        path: '/search',
        query: { q: this.search }
      });
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.keyword = this.$route.query.q;
        this.searchPhotos();
      },
    },
  },
}
</script>

<style scoped>
.form-field {
  width: 100%;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.row div {
  width: 25%;
}

.row img {
  width: 100px;
}
</style>