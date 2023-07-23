import React from 'react';
import { PharosButton } from "@ithaka/pharos/lib/react-components/button/pharos-button";
import { PharosContext } from "@ithaka/pharos/lib/utils/PharosContext";

const headerStyle = {
    border: "3px dotted limegreen",
    borderRadius: 10,
    padding: 20
}

const Header = () => {
    const pharosContext = { prefix: "mfe-navigation" };

    return (
        <PharosContext.Provider value={pharosContext}>
            <div className="header" style={headerStyle}>
                Microfrontend Playground
                <PharosButton>Hello</PharosButton>
            </div>
        </PharosContext.Provider>
    );
};

export default Header;