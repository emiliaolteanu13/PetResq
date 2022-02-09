import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "semantic-ui-react";
import './homepage.css';
import Sky from './Sky.png';
import Field from './Field.png';
import Footer from "../../app/layout/Footer";
import Cat from './cat.png';
import Dog from './dog.png';
import Cat2 from './cat2.png';


export default function HomePage() {
    

    
    return (
            <div className="wrapper">
                <div className="header">
                    <img src={Sky} className="background" />
                    <img src={Field} className="foreground" />
                    <h1 className="title">Welcome</h1>
                </div>
                <div className="option1">
                    Are you here to adopt a pet?
                    <Link to='/posts' > Adopt</Link>
                    <img src={Cat} className="option1img"/>
                </div>
                <div className="option2">
                    <img src={Dog} className="option2img" />
                    Did you furry firend got lost?
                    <Link to='/posts' > Search</Link>

                </div>
                <div className="option3">
                    Did you find a lost pet?
                    <Link to='/posts' > Adopt</Link>
                    <img src={Cat2} className="option3img" />
                </div>
                
            </div>            

            
    )
}


