<template>
  <div>
    <h1>
      photos
    </h1>

    <button @click="load">Refresh</button>

    <div class="row">
      <div>Name</div>
      <div>Photo</div>
      <div>Description</div>
      <div>Actions</div>
    </div>

    <div v-for="p of photos" class="row" :key="p.id">
      <div>
        <img :src="p.photoFile" />
      </div>
      <div>{{ p.name }}</div>
      <div>{{ p.description }}</div>
      <div>
        <button @click="edit(p.id)">Edit</button>
        <button @click="deletePhoto(p.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      photos: [],
    }
  },

  methods: {
    async loadPhotos() {
      const { data } = await axios.get('http://localhost:3000/photos');
      this.photos = data;
    },

    editPhoto(id) {
      this.$router.push(`/photos/${id}/edit`);
    },

    async deletePhoto(id) {
      await axios.delete(`http://localhost:3000/photos/${id}`);
      this.loadPhotos();
    },



  },
  beforeMount() {
    this.loadPhotos();
  }
}
</script>

<style>
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