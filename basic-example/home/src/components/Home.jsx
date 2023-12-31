import React, {useEffect} from 'react';
import { useRef } from 'react';

import { mountHeader } from "mfeNavigation/mountHeader";
import { mountFooter } from "mfeNavigation/mountFooter";
import { mountImageViewer } from "mfeImageViewer/mountImageViewer";
import { mountImageRecommender } from "mfeImageRecommender/mountImageRecommender";

import "../styles/home.css"

const Home = () => {

    const headerMountPointRef = useRef(null);
    const footerMountPointRef = useRef(null);
    const imageViewerMountPointRef = useRef(null);
    const imageRecommenderMountPoint = useRef(null);

    useEffect(() => {
        mountHeader(headerMountPointRef.current)
        mountFooter(footerMountPointRef.current)
        mountImageViewer(imageViewerMountPointRef.current)
        mountImageRecommender(imageRecommenderMountPoint.current)
    })


    return (
        <div className="home">

            <div ref={headerMountPointRef}></div>

            <div ref={imageViewerMountPointRef} />

            <div ref={imageRecommenderMountPoint} />

            <div ref={footerMountPointRef}></div>

        </div>
    );
};

export default Home;