import React, { useState, useEffect } from 'react';

import './style.scss'
import { Link } from 'react-router-dom';

function Header() {
    return ( 
        <div className="header">
            <div className="container">
                <div className="logo">
                    <div className="inner">
                        FaceRecognition
                    </div>
                </div>

                <div className="navigation">
                    <div>
                        <Link to={'/history'}>История запросов</Link>
                    </div>
                    <div>
                        <Link to={'/profile'}>Профиль</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;