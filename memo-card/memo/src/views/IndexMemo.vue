<template>
  <div class="flex items-center justify-between w-full pb-4">
    <h2 class="text-2xl font-bold text-primary-100 font-mono">Collect Your Memory</h2>
    <router-link
      to="/create"
      class="text-primary-100 text-md py-2 px-5 border-2 font-semibold border-primary-100 hover:bg-primary-100 hover:text-white"
      >Create</router-link
    >
  </div>
  <ul
    class="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    <li
      v-for="item in memo"
      :key="item.id"
      class="card group bg-primary-300 rounded-md p-5 border-2 border-transparent hover:border-primary-100"
    >
      <a href="">
        <img
          :src="getImageUrl(item.image)"
          alt="Memo Image"
          class="rounded-md h-60 w-full object-cover pb-3"
        />
        <strong class="text-default-100 text-xl font-mono line-clamp-2 mb-3">{{
          item.title
        }}</strong>
        <p class="break-all mb-3 line-clamp-6">{{ item.description }}</p>
      </a>
      <div class="flex items-baseline">
        <button
          class="mt-2 text-xs font-bold bg-white text-primary-100 hover:bg-primary-100 hover:text-white group-hover:bg-primary-100 group-hover:text-white text-center w-full py-2 border border-primary-100 rounded-2xl"
          @click.prevent="openModal(item)"
        >
          View Detail
        </button>
        <div
          v-if="item.id === selectedItemId"
          class="fixed inset-0 z-100 max-h-[95vh] m-3 my-auto overflow-auto flex items-center justify-center"
        >
          <div class="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div
            class="relative w-[70rem] px-[3rem] pt-[3rem] pb-[2rem] rounded-xl bg-white shadow-lg"
          >
            <div class="w-full mb-2">
              <div class="flex justify-between gap-3 mb-2">
                <strong class="text-default-100 text-2xl font-mono line-clamp-2 mb-3">{{
                  item.title
                }}</strong>
                <button class="md:mb-0" @click.prevent="closeModal">
                  <svg
                    width="35px"
                    height="35px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.0303 8.96965C9.73741 8.67676 9.26253 8.67676 8.96964 8.96965C8.67675 9.26255 8.67675 9.73742 8.96964 10.0303L10.9393 12L8.96966 13.9697C8.67677 14.2625 8.67677 14.7374 8.96966 15.0303C9.26255 15.3232 9.73743 15.3232 10.0303 15.0303L12 13.0607L13.9696 15.0303C14.2625 15.3232 14.7374 15.3232 15.0303 15.0303C15.3232 14.7374 15.3232 14.2625 15.0303 13.9696L13.0606 12L15.0303 10.0303C15.3232 9.73744 15.3232 9.26257 15.0303 8.96968C14.7374 8.67678 14.2625 8.67678 13.9696 8.96968L12 10.9393L10.0303 8.96965Z"
                      fill="#eb6153"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
                      fill="#eb6153"
                    />
                  </svg>
                </button>
              </div>
              <div class="flex gap-8 max-h-[20rem] overflow-y-auto">
                <div class="p-6 bg-primary-300 rounded-md w-[40%]">
                  <img
                    :src="getImageUrl(item.image)"
                    alt="Memo Image"
                    class="rounded-md h-72 w-full object-cover pb-3"
                  />
                </div>
                <div class="w-[60%]">
                  <p class="break-all pb-3 text-lg">{{ item.description }}</p>
                </div>
              </div>
            </div>
            <div class="mt-4 flex items-center gap-5 justify-end">
              <button
                @click="editMemo(item)"
                class="text-primary-100 text-md py-2 px-5 border font-semibold border-primary-200 hover:bg-primary-100 hover:text-white"
              >
                Edit
              </button>
              <button
                @click="deleteMemo(item.id)"
                class="text-primary-100 text-md py-2 px-5 border font-semibold border-primary-200 hover:bg-primary-100 hover:text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { memo, updatedMemo, editMode, getImageUrl } from "../assets/js/utility";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const selectedItemId = ref(null);

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

function editMemo(item) {
  editMode.value = true;
  updatedMemo.value.id = item.id;
  updatedMemo.value.title = item.title;
  updatedMemo.value.description = item.description;
  updatedMemo.value.image = item.image;

  router.push({ name: "EditMemo", params: { id: item.id } });
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

function openModal(item) {
  selectedItemId.value = item.id;
}

function closeModal() {
  selectedItemId.value = null;
}
</script>
