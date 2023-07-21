<template>
    <div class="image-viewer">

    </div>
</template>

<script>

export default {
    name: "ImageViewer",
    data() {
        return {
            foo: "bar"
        }
    },
    mounted() {
        console.log("mounted!");
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