import React from 'react';
import { mountFooter } from "./exposedModules/mountFooter";
import { mountHeader } from "./exposedModules/mountHeader";


const sandbox = document.getElementById("mfe-navigation__sandbox");
if (sandbox) {

    const headerMountPoint = document.getElementById("header-mount-point");
    mountHeader(headerMountPoint);

    const footerMountPoint = document.getElementById("footer-mount-point");
    mountFooter(footerMountPoint);


}