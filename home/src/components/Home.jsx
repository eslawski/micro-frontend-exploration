import React, {useEffect} from 'react';
import { useRef } from 'react';

import { mountHeader } from "mfeNavigation/mountHeader";
import { mountFooter } from "mfeNavigation/mountFooter";
import { mountImageViewer } from "mfeImageViewer/mountImageViewer";

const Home = () => {

    const headerMountPointRef = useRef(null);
    const footerMountPointRef = useRef(null);
    const imageViewerMountPointRef = useRef(null);

    useEffect(() => {
        mountHeader(headerMountPointRef.current)
        mountFooter(footerMountPointRef.current)
        mountImageViewer(imageViewerMountPointRef.current)
    })


    return (
        <div style={{ maxWidth: 1200, margin: 'auto' }}>

            <div ref={headerMountPointRef}></div>

            <div ref={imageViewerMountPointRef} />

            <div ref={footerMountPointRef}></div>

        </div>
    );
};

export default Home;