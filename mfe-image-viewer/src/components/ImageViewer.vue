<template>
    <div class="image-viewer">
        <div ref="theImage" />
    </div>
</template>

<script>

import { mountImage } from "mfeImage/mountImage";

export default {
    name: "ImageViewer",
    data() {
        return {
            foo: "bar"
        }
    },
    mounted() {
        const imageMountPoint = this.$refs.theImage;
        mountImage(imageMountPoint, { imageUrl : "https://picsum.photos/id/76/175" });
    },
    methods: {
        doSomethingCrazy() {
            console.log("something crazy");
        }
    }
}
</script>

<style scoped>

.image-viewer {
    border: 3px dotted dodgerblue;
    border-radius: 10px;
    padding: 20px;
    height: 400px;
}

</style>