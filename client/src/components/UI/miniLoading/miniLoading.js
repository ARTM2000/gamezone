import React from 'react';

import StyleSheet from './miniLoading.module.css';

const miniLoading = (props) => (
<div className={StyleSheet.main}>
    <span className={StyleSheet.loading1}></span>
    {/* <span className={StyleSheet.loading2}></span> */}
</div>);

export default miniLoading;