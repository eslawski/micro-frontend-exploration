import React from 'react';
import { PharosButton } from "@ithaka/pharos/lib/react-components/button/pharos-button";
import { PharosIcon } from "@ithaka/pharos/lib/react-components/icon/pharos-icon";
import { PharosContext } from "@ithaka/pharos/lib/utils/PharosContext";

import "./styles/header.css";

const Header = () => {
    const pharosContext = { prefix: "mfe-navigation" };

    return (
        <PharosContext.Provider value={pharosContext}>
            <div className="header">
                <div>
                    <h3 className="header__title"><PharosIcon name="workspace" /> Microfrontend Playground</h3>
                </div>

                <div className="header__links">
                    <PharosButton variant="subtle" iconRight="chevron-down">Support</PharosButton>
                    <PharosButton variant="subtle" iconRight="chevron-down">Tools</PharosButton>
                    <PharosButton variant="subtle" iconRight="chevron-down">Explore</PharosButton>
                    <PharosButton variant="secondary">Register</PharosButton>
                    <PharosButton>Log in</PharosButton>

                </div>
            </div>
        </PharosContext.Provider>
    );
};

export default Header;