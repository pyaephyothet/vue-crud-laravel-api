<template>
  <h1>memo List</h1>
  <ul class="bg-primary-100">
    <li v-for="item in memo" :key="item.id">
      <strong>{{ item.title }}</strong
      >: {{ item.description }}
      <img
        :src="getImageUrl(item.image)"
        alt="Memo Image"
        class="w-9 h-9 object-cover flex justify-center items-center"
      />
      <button @click="editMemo(item)">Edit</button>
      <button @click="deleteMemo(item.id)">Delete</button>
    </li>
  </ul>

  <h2 v-if="editMode">Edit memo</h2>
  <form v-if="editMode" method="PUT" @submit.prevent="updateMemo">
    <input type="text" v-model="updatedMemo.title" placeholder="Title" required />
    <textarea
      v-model="updatedMemo.description"
      placeholder="Description"
      required
    ></textarea>
    <div>
      <img
        class="mb-5 mt-2 h-32 w-32 rounded-md object-cover"
        :src="getImageUrl(updatedMemo.image)"
        id="preview"
      />
    </div>
    <input type="file" @change="handleImageChange" accept="image/*" />
    <button type="submit">Update</button>
  </form>

  <h2 v-if="!editMode">Create memo</h2>
  <form v-if="!editMode" @submit.prevent="createMemo">
    <input type="text" v-model="newMemo.title" placeholder="Title" required />
    <textarea v-model="newMemo.description" placeholder="Description" required></textarea>
    <div><img class="mb-5 mt-2 h-32 w-32 rounded-md object-cover" id="preview" /></div>
    <input type="file" @change="handleImageChange" accept="image/*" />
    <button type="submit">Create</button>
  </form>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const memo = ref([]);
const newMemo = ref({
  title: "",
  description: "",
  image: null,
});
const editMode = ref(false);
const updatedMemo = ref({
  id: null,
  title: "",
  description: "",
  image: null,
});

onMounted(fetchMemo);

function fetchMemo() {
  axios
    .get("http://localhost:8000/api/memo")
    .then((response) => {
      memo.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function createMemo() {
  const formData = new FormData();
  formData.append("title", newMemo.value.title);
  formData.append("description", newMemo.value.description);
  formData.append("image", newMemo.value.image);

  axios
    .post("http://localhost:8000/api/memo", formData)
    .then((response) => {
      memo.value.push(response.data);
      resetNewMemo();
    })
    .catch((error) => {
      console.error(error);
    });
}

function editMemo(item) {
  editMode.value = true;
  updatedMemo.value.id = item.id;
  updatedMemo.value.title = item.title;
  updatedMemo.value.description = item.description;
  updatedMemo.value.image = item.image;
}

function updateMemo() {
  const formData = new FormData();
  //  formData.append("id", updatedMemo.value.id);
  formData.append("title", updatedMemo.value.title);
  formData.append("description", updatedMemo.value.description);
  formData.append("image", updatedMemo.value.image);

  axios
    .put(`http://localhost:8000/api/memo/${updatedMemo.value.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      const index = memo.value.findIndex((item) => item.id === updatedMemo.value.id);
      memo.value[index] = response.data;
      resetEditMemo();
    })
    .catch((error) => {
      console.error(error);
    });
}

function deleteMemo(memoId) {
  if (confirm("Are you sure you want to delete this memo?")) {
    axios
      .delete(`http://localhost:8000/api/memo/${memoId}`)
      .then(() => {
        memo.value = memo.value.filter((item) => item.id !== memoId);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

function handleImageChange(event) {
  const file = event.target.files[0];
  const preview = document.getElementById("preview");
  if (editMode.value) {
    updatedMemo.value.image = file;
  } else {
    newMemo.value.image = file;
  }
  preview.src = URL.createObjectURL(file);
  preview.style.display = "block";
}

function getImageUrl(imagePath) {
  if (imagePath instanceof File) {
    return URL.createObjectURL(imagePath);
  } else {
    return `http://localhost:8000/storage/${imagePath}`;
  }
}

function resetNewMemo() {
  newMemo.value.title = "";
  newMemo.value.description = "";
  newMemo.value.image = null;

  // Reset the preview image
  const preview = document.getElementById("preview");
  preview.src = "";
  preview.style.display = "none";
}

function resetEditMemo() {
  editMode.value = false;
  updatedMemo.value.id = null;
  updatedMemo.value.title = "";
  updatedMemo.value.description = "";
  updatedMemo.value.image = null;

  // Reset the preview image
  const preview = document.getElementById("preview");
  preview.src = "";
  preview.style.display = "none";
}
</script>
