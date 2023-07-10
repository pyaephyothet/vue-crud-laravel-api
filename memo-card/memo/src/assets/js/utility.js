import { ref } from "vue";

export const memo = ref([]);
export const newMemo = ref({
    title: "",
    description: "",
    image: null,
});
export const editMode = ref(false);
export const updatedMemo = ref({
    id: null,
    title: "",
    description: "",
    image: null,
});

export function handleImageChange(event) {
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

export function getImageUrl(imagePath) {
    if (imagePath instanceof File) {
        return URL.createObjectURL(imagePath);
    } else {
        return `http://localhost:8000/storage/${imagePath}`;
    }
}
