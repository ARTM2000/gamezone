import React from 'react';

import StyleSheet from './wrapper.module.css';

const wrapper = (props) => (<div className={StyleSheet.wrapper}>{props.children}</div>);

export default wrapper;