import React from 'react';
import '../../src/App.css';

const Loader = ({status})=>{

    console.log(status);
    return(
        <div id='loader-container' style={{display:status?'block':'none'}}>
            <div id="loader-dialog">
                <span id="spinner"></span>
                <span id="load-text">Loading...</span>
            </div>
        </div>
    );
};

export default Loader;