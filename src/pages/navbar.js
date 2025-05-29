import React from 'react';
import {Link} from 'react-router-dom';
import "../App.css"


const Navbar=()=>{
    return (    
                <div className='navBar'>
                    <div className='main'>
                        <Link to="/main">Test</Link>
                    </div>
                    <div className='stats'>
                        <Link to="/stats">Stats</Link>
                </div>
                </div>
    )

}

export default Navbar;