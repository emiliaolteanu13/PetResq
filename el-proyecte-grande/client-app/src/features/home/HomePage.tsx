import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";
//@ts-ignore
import {Helmet} from "react-helmet";
import './homepage.css';
//@ts-ignore
import ScriptTag from 'react-script-tag';


export default function HomePage() {
    
    // const[rellax, setRellax] = useState();
    // useEffect(() => {
    //     setRellax(new Rellax('.rellax',{horizontal: true, vertical: false, speed: 1.5}));
    // })
    
    return (
        <>
            <aside className="helper">Scroll sideways</aside>
            <main>
                <figure className="rellax">
                    <img src="https://source.unsplash.com/aiyBwbrWWlo" alt="Me coding" />
                    <figcaption className="rellax" data-rellax-speed="1">Me coding</figcaption>
                </figure>
  
                <figure className="rellax">
                    <img src="https://source.unsplash.com/EaJm0ZfO84U" alt="Bronte Beach, Australia" />
                    <figcaption className="rellax" data-rellax-speed="1">Bronte Beach, Australia</figcaption>
                </figure>
  
                <figure className="rellax">
                    <img src="https://source.unsplash.com/e9rkZKjdlSc" alt="The moon" />
                    <figcaption className="rellax" data-rellax-speed="1">The moon</figcaption>
                </figure>
            </main>

            {/* <ScriptTag src="https://cdn.rawgit.com/dixonandmoe/rellax/master/rellax.min.js"/> */}
            <Helmet>
                <script src="https://cdn.rawgit.com/dixonandmoe/rellax/master/rellax.min.js"></script>
            </Helmet>
            
        </>
    )
}


//<Container style={{marginTop: '7em'}}>
        //     <h1>Home page</h1>
        //     <h3> Go to <Link to='/posts'>Posts</Link></h3>
        // </Container>