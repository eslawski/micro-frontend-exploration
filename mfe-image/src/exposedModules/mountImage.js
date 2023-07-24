import React from 'react';

import { createRoot } from "react-dom/client";
import Image from "../components/Image.jsx";

export function mountImage(mountPoint, props) {
    const root = createRoot(mountPoint);
    root.render(<Image imageUrl={props.imageUrl} />);
}