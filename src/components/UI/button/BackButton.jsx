import React from 'react';
import classes from './BackButton.module.css'
import {useNavigate, Link} from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();
    return (
        <Link>
        <div className={classes.back} onClick={()=>navigate(-1)}>
            <img src="https://www.svgrepo.com/show/348590/arrow-thin-left.svg" alt="" /> 
            <p className='labels'>Back</p>
        </div>
        </Link>
        
    );
};

export default BackButton;