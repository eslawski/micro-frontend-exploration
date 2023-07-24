import React from 'react';

import "./styles/image.css"

const Image = (props) => {
    return (
        <div className="image">
            <img src={props.imageUrl} alt=""/>
        </div>
    );
};

export default Image;