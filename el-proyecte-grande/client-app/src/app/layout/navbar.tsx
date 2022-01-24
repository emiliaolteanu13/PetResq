import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';


export default function NavBar() {
    
    
    

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png"  alt="logo" id='Logo' style={{marginRight: '15px', height: '10em', width: 'auto'}} />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/posts' name='Posts' />
                <Menu.Item as={NavLink} to='/createPost' positive content='Create Post' />
            </Container>
        </Menu>
    )
}