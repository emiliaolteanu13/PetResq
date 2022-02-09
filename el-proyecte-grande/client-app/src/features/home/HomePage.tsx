import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Segment, Grid, Header } from "semantic-ui-react";
import './homepage.css';
import Sky from './Sky.png';
import Field from './Field.png';
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { ClientRequest } from "http";


export default observer (function HomePage() {
    const {userStore} = useStore();

    
    return (

        <>
        {userStore.isLoggedIn ? (
            <>
                <Header as='h2' inverted content="welcome"></Header>
                <Button className="ui button" as={Link} to='/posts' size="huge" color='blue' inverted>Go to posts</Button>
            </>
        ) : (
            <Grid>
                <Grid.Column textAlign="center">
                    <div className="ui vertical buttons" >
                        <Button className="ui button" as={Link} to='/login' size="huge" color='blue' inverted>Login</Button>
                        <Button className="ui button" as={Link} to='/register' size="huge" color='blue' inverted>Register</Button>
                        <Button className="ui button" as={Link} to='/posts' size="huge" color='blue' inverted>Anonymous</Button>
                    </div> 
                </Grid.Column>
            </Grid> 
        )}
            {/* <div className="wrapper">
                <header> */}

              
                

                
                    
                    {/* <Segment>
                        <Button.Group widths='7'>
                            <Button as={Link} to='/login' size="huge" color='blue' inverted>
                                Login!
                            </Button>
                            <Button as={Link} to='/register' size="huge" color='blue' inverted>
                                Register!
                            </Button>
                            <Button as={Link} to='/posts' size="huge" color='blue' inverted>
                                Anonymous
                            </Button>
                        </Button.Group>
                    </Segment> */}
                    {/* <img src={Sky} className="background" />
                    <h1 className="title">Welcome</h1>
                </header> */}
                
                
                {/* <div className="option1">
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
                </div> */}
            {/* </div> */}
            
        </> 

            
    )
})


