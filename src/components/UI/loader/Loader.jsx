import React from 'react';
import classes from './Loader.module.css'
const Loader = () => {
    return (
        // <div />
        <div className={classes.loader_container}>
            <img  className={classes.loader} src="https://www.svgrepo.com/show/473288/loader.svg" alt="" />
        </div>
        
    );
};

export default Loader;