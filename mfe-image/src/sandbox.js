import React from 'react';
import { mountImage } from "./exposedModules/mountImage";


const sandbox = document.getElementById("mfe-image__sandbox");
if (sandbox) {

    const imageMountPoint = document.getElementById("image-mount-point");
    mountImage(imageMountPoint);

}