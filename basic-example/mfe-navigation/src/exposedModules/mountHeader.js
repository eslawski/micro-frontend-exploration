import React from 'react';

import { createRoot } from "react-dom/client";
import Header from "../components/Header.jsx";

import "../utils/initPharos";

export function mountHeader(mountPoint) {
    const root = createRoot(mountPoint);
    root.render(<Header />);
}