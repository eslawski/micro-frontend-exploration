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
        mountImage(imageMountPoint);
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
    background-color: lightblue;
    height: 500px;
}

</style>