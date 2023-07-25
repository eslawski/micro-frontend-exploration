<template>
    <div class="image-viewer">
        <div class="left">
            <div ref="theImage" />
            <div class="action-buttons">
                <mfe-image-viewer-pharos-button
                    full-width="true"
                >
                    Download
                </mfe-image-viewer-pharos-button>
                <mfe-image-viewer-pharos-button
                    variant="secondary"
                    full-width="true"
                >
                    Share
                </mfe-image-viewer-pharos-button>
                <mfe-image-viewer-pharos-button
                    variant="secondary"
                    full-width="true"
                >
                    Save
                </mfe-image-viewer-pharos-button>
            </div>
        </div>
        <div class="right">
            <h1>Green Bike Old Shed</h1>
            <p class="text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
            </p>
            <p class="text">
                Adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
            </p>
        </div>
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
@import "@ithaka/pharos/lib/styles/fonts.css";
@import "@ithaka/pharos/lib/styles/variables.css";

.image-viewer {
    border: 3px dotted dodgerblue;
    border-radius: 10px;
    padding: 20px;
    height: 400px;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 56px;
}

.action-buttons {
    padding-top: 16px;
    width: 75%;
    display: grid;
    grid-gap: 8px;
    margin: auto;
}

.right .text {
    font-size: 20px;
}

</style>