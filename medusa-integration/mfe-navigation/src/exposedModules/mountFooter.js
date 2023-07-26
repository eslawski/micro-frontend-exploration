import React from 'react';

import { createRoot } from "react-dom/client";
import Footer from "../components/Footer.jsx";

import "../utils/initPharos";

export function mountFooter(mountPoint) {
    const root = createRoot(mountPoint);
    root.render(<Footer />);
}