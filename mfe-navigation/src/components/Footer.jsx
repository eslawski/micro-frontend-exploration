import React from 'react';
import { PharosButton } from "@ithaka/pharos/lib/react-components/button/pharos-button";
import { PharosContext } from "@ithaka/pharos/lib/utils/PharosContext";


import "./styles/footer.css";

const Footer = () => {
    const pharosContext = { prefix: "mfe-navigation" };

    return (
        <PharosContext.Provider value={pharosContext}>
            <div className="footer">
                <div>©2023 Microfrontend Playground</div>
                <div className="footer__socials">
                    <PharosButton icon="twitter" variant="subtle" />
                    <PharosButton icon="google" variant="subtle" />
                    <PharosButton icon="linkedin" variant="subtle" />
                    <PharosButton icon="youtube" variant="subtle" />
                </div>
            </div>
        </PharosContext.Provider>
    );
};

export default Footer;