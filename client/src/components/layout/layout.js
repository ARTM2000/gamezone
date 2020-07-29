import React from 'react';

import StyleSheet from './layout.module.css';

const layout = (props) => {

    return (
        <div className={StyleSheet.Main}>
            {props.children}
        </div>
    )
};

export default layout;