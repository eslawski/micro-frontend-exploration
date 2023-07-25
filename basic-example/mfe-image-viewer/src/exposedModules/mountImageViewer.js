import {createApp} from "vue";
import ImageViewer from "../components/ImageViewer.vue";
import "../utils/initPharos";

export function mountImageViewer(mountPoint) {
    const vueApp = createApp(ImageViewer);
    vueApp.mount(mountPoint);
}