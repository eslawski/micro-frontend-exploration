import React, {useEffect} from 'react';
import { useRef } from 'react';

import {mountHeader} from "mfeNavigation/mountHeader";
import {mountFooter} from "mfeNavigation/mountFooter";

const Home = () => {

    const headerMountPointRef = useRef(null);
    const footerMountPointRef = useRef(null);

    useEffect(() => {
        mountHeader(headerMountPointRef.current)
        mountFooter(footerMountPointRef.current)
    })


    return (
        <div style={{ maxWidth: 1200, margin: 'auto' }}>

            <div ref={headerMountPointRef}></div>

            <div ref={footerMountPointRef}></div>

        </div>
    );
};

export default Home;