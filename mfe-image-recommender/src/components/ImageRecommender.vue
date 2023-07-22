<template>
    <div class="image-recommender">
        <div ref="theImage" />
        <div ref="theImage1" />
        <div ref="theImage2" />
        <div ref="theImage3" />
    </div>
</template>

<script>

import { mountImage } from "mfeImage/mountImage";

export default {
    name: "ImageRecommender",
    data() {
        return {
            foo: "bar"
        }
    },
    mounted() {
        const imageMountPoint = this.$refs.theImage;
        mountImage(imageMountPoint);

        const imageMountPoint1 = this.$refs.theImage1;
        mountImage(imageMountPoint1);

        const imageMountPoint2 = this.$refs.theImage2;
        mountImage(imageMountPoint2);

        const imageMountPoint3 = this.$refs.theImage3;
        mountImage(imageMountPoint3);
    },
    methods: {
        doSomethingCrazy() {
            console.log("something crazy");
        }
    }
}
</script>

<style scoped>

.image-recommender {
    background-color: lightcoral;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-items: center;
}

</style>