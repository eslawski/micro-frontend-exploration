import {createApp} from "vue";
import ImageRecommender from "../components/ImageRecommender.vue";

export function mountImageRecommender(mountPoint) {
    const vueApp = createApp(ImageRecommender);
    vueApp.mount(mountPoint);
}