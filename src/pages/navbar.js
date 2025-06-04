import React from 'react';
import {Link} from 'react-router-dom';
import "../App.css"


const Navbar=()=>{
    return (    
        <div className='navBar'>
            <img className="logo" src="logo.png"/>
            <h1 className="title">Word-Image Memory Tester</h1>
            <div className='main'>
                <Link to="/">Test</Link>
            </div>
            <div className='stats'>
                <Link to="/stats">Stats</Link>
            </div>
            <div className='about'>
                <Link to="/about">About</Link>
            </div>
        </div>
    )

}

export default Navbar;