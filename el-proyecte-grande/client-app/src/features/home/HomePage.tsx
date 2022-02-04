import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "semantic-ui-react";
import './homepage.css';
import Sky from './Sky.png';
import Field from './Field.png';


export default function HomePage() {
    

    
    return (
        <>
            <div className="wrapper">
                <header>
                    <img src={Sky} className="background" />
                    <img src={Field} className="foreground" />
                    <h1 className="title">Welcome</h1>
                </header>
                <div className="option1">
                    Are you here to adopt a pet?
                    <Link to='/posts' > Adopt</Link>
                </div>
                <div className="option2">
                    Did you furry firend got lost?
                    <Link to='/posts' > Search</Link>
                </div>
                <div className="option3">
                    Did you find a lost pet?
                    <Link to='/posts' > Adopt</Link>
                </div>
            </div>
            
        </>

            
    )
}


