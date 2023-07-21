import { mountImageViewer } from "./exposedModules/mountImageViewer";


const sandbox = document.getElementById("mfe-image-viewer__sandbox");
if (sandbox) {

    const imageViewerMountPoint = document.getElementById("image-viewer-mount-point");
    mountImageViewer(imageViewerMountPoint);

}