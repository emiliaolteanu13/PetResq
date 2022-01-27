import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";
import './homepage.css';
import simpleParallax from 'simple-parallax-js';
import background from './background.png'
import cat1 from './cat1.png'


export default function HomePage() {
    
    useEffect(() => {
        var image = document.getElementsByClassName('cat1');
        new simpleParallax(image, {
            orientation: 'right',
            overflow:true,
            scale:1.5,
            maxTransition:50
        });
    })
    
    return (
        <>
            <div className="homepage">
                <div className="home">
                    <Link to={'/posts'}> Posts </Link>
                    <img className="cat1" src={cat1} style={{height:'10em', width:'auto',position:'absolute', bottom:'0em'}}/>
                </div>
            </div>
            
        </>

            
    )
}


//<Container style={{marginTop: '7em'}}>
        //     <h1>Home page</h1>
        //     <h3> Go to <Link to='/posts'>Posts</Link></h3>
        // </Container>