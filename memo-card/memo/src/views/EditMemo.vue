<template>
  <h1
    class="text-2xl font-bold text-primary-100 font-mono pb-1 border-b-2 border-primary-100"
  >
    Edit Your Memo
  </h1>
  <form method="POST" @submit.prevent="updateMemo" enctype="multipart/form-data">
    <div class="flex flex-col md:flex-row gap-8 w-full py-6">
      <div class="flex flex-col w-full md:w-1/2">
        <label for="title" class="text-lg text-primary-100 pb-2">Title:</label>
        <input
          type="text"
          v-model="updatedMemo.title"
          id="title"
          class="border border-primary-200 focus:outline-none p-3 mb-3"
          required
        />
        <label for="description" class="text-lg text-primary-100 pb-2">Description</label>
        <textarea
          v-model="updatedMemo.description"
          id="description"
          class="border border-primary-200 h-40 p-3 focus:outline-none"
          required
        ></textarea>
      </div>
      <div class="w-1/2">
        <h2 class="text-lg text-primary-100 pb-2">Image:</h2>
        <div class="relative border-0">
          <img
            class="h-[16rem] w-[16rem] border border-primary-200 object-cover"
            :src="getImageUrl(updatedMemo.image)"
            id="preview"
          />
          <label
            class="absolute top-0 left-0 w-[16rem] h-[16rem] opacity-0 hover:opacity-100 cursor-pointer flex items-center justify-center"
            for="file-input"
          >
            <svg
              class="plus-icon text-primary-100 w-8 h-8 transition-opacity duration-200"
              width="20px"
              height="20px"
              viewBox="0 -0.5 21 21"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <title>plus [#1469]</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="Dribbble-Light-Preview"
                  transform="translate(-99.000000, -440.000000)"
                  fill="#eb6153"
                >
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path
                      d="M57.7,289 L54.55,289 L54.55,286 L52.45,286 L52.45,289 L49.3,289 L49.3,291 L52.45,291 L52.45,294 L54.55,294 L54.55,291 L57.7,291 L57.7,289 Z M55.6,280 L55.6,282 L61.9,282 L61.9,288 L64,288 L64,280 L55.6,280 Z M61.9,298 L55.6,298 L55.6,300 L64,300 L64,292 L61.9,292 L61.9,298 Z M45.1,292 L43,292 L43,300 L51.4,300 L51.4,298 L45.1,298 L45.1,292 Z M45.1,288 L43,288 L43,280 L51.4,280 L51.4,282 L45.1,282 L45.1,288 Z"
                      id="plus-[#1469]"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
          </label>
          <input
            type="file"
            id="file-input"
            @change="handleImageChange"
            accept="image/*"
            class="hidden"
          />
        </div>
      </div>
    </div>
    <button
      type="submit"
      class="text-primary-100 text-md py-2 px-5 border font-semibold border-primary-200 hover:bg-primary-100 hover:text-white"
    >
      Update
    </button>
  </form>
</template>
<script setup>
import { memo, updatedMemo, getImageUrl, handleImageChange } from "../assets/js/utility";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

function updateMemo() {
  const formData = new FormData();
  formData.append("id", updatedMemo.value.id);
  formData.append("title", updatedMemo.value.title);
  formData.append("description", updatedMemo.value.description);
  formData.append("image", updatedMemo.value.image);

  axios
    .post(`http://localhost:8000/api/memo/${updatedMemo.value.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, OPTIONS",
      },
    })
    .then((response) => {
      const index = memo.value.findIndex((item) => item.id === updatedMemo.value.id);
      memo.value[index] = response.data;
      router.push({ name: "IndexMemo" });
      resetEditMemo();
    })
    .catch((error) => {
      console.error(error);
    });
}

function resetEditMemo() {
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
