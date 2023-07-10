import { createRouter, createWebHistory } from "vue-router";
import IndexMemo from "../views/IndexMemo.vue";
import CreateMemo from "../views/CreateMemo.vue";
import EditMemo from "../views/EditMemo.vue";

const routes = [
    {
        path: "/",
        name: "IndexMemo",
        component: IndexMemo,
    },
    {
        path: "/create",
        name: "CreateMemo",
        component: CreateMemo,
    },
    {
        path: "/edit/:id",
        name: "EditMemo",
        component: EditMemo,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
