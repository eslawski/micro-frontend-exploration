import React from 'react';

const headerStyle = {
    border: "3px dotted limegreen",
    borderRadius: 10,
    padding: 20
}

const Header = () => {
    return (
        <div style={headerStyle}>
            I am header
        </div>
    );
};

export default Header;