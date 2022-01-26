import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";
import './homepage.css';
import simpleParallax from 'simple-parallax-js';
import background from './background.png'


export default function HomePage() {
    
    // const[rellax, setRellax] = useState();
    useEffect(() => {
        var image = document.getElementsByClassName('thumbnail');
        new simpleParallax(image, {
            orientation: 'right',
            transition: 'true',
        });
    })
    
    return (
        <>
                    <div className="home">

                    </div>

        </>

            
    )
}


//<Container style={{marginTop: '7em'}}>
        //     <h1>Home page</h1>
        //     <h3> Go to <Link to='/posts'>Posts</Link></h3>
        // </Container>