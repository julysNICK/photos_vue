
<template>
  <div class="form">
    <h1>{{ $route.params.id ? "Edit" : "Add" }} photos</h1>

    <form @submit.prevent="submit">
      <div>
        <label for="name">Name</label>
        <br />
        <input class="form-field" type="text" id="name" v-model="form.name" />
      </div>

      <div>
        <label for="description">Description</label>
        <br />
        <textarea class="form-field" id="description" v-model="form.description"></textarea>
      </div>

      <div>
        <label for="dateTaken">Date Taken</label>
        <br />
        <input class="form-field" type="date" id="dateTaken" v-model="form.dateTaken" />
      </div>

      <div>
        <label for="photoFile">Photo</label>
        <br />
        <input class="form-field" type="file" id="photoFile" @change="onChange" />
        <br />
        <img id="photo-preview" :src="form.photoFile" />
      </div>

      <div>
        <input type="submit" value="Submit" />
      </div>

    </form>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PhotoForm',
  data() {
    return {
      form: {
        name: '',
        description: '',
        dateTaken: '',
        photoFile: null,
      }
    }
  },
  methods: {
    async submit() {
      const { name, description, dateTaken, photoFile } = this.form;

      if (!name || !description || !dateTaken || !photoFile) {
        alert('Please fill out all fields');
        return;
      }

      const { id } = this.$route.params;

      if (id) {
        await axios.put(`http://localhost:8080/photos/${id}`, this.form);
      } else {
        await axios.post('http://localhost:8080/photos', this.form);
      }

      this.$router.push('/');
    },

    onChange(ev) {
      const reader = new FileReader();

      reader.readAsDataURL(ev.target.files[0]);
      reader.onload = () => {
        this.form.photoFile = reader.result;
      }
    }
  },

  async beforeUpdate() {
    const { id } = this.$route.params;

    if (id) {
      const { data } = await axios.get(`http://localhost:3000/photos/${id}`);
      this.form = data;
    }
  }

}
</script>

<style scoped>
.form {
  margin: 0 auto;
  width: 70vw;
}

.form-field {
  width: 100%;
}

#photo-preview {
  width: 200px;
}
</style>