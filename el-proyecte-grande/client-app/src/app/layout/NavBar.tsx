import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container, Menu, Image, Dropdown } from 'semantic-ui-react';
import LoginForm from '../../features/users/LoginForm';
import RegisterForm from '../../features/users/RegisterForm';
import ModalStore from '../stores/modalStore';
import { useStore } from '../stores/store';


export default observer (function NavBar() {
    
    const {userStore: {user, logout}, modalStore} = useStore();
    

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <div className='logo'>
                        <img src="/assets/logo.png"  alt="logo" style={{marginRight: '15px', height: '10em', width: 'auto'}} />
                        <img src='/assets/logoHover.png' id='img-top' style={{marginRight: '15px', height: '10em', width: 'auto'}} />
                    </div>
                </Menu.Item>
                <Menu.Item as={NavLink} to='/posts' name='Posts' />
                {
                    user &&<Menu.Item as={NavLink} to='/createPost' positive content='Create Post' />
                }
                {user &&
                <Menu.Item position='right'>
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName} className='link item'>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/${user?.username}`} 
                                text='My Profile' icon='user' />
                            <Dropdown.Item as={Link} onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown> 
                </Menu.Item>
}
                {
                !user &&
                    <>
                    
                    <Menu.Item position='right' content='Login' onClick={() => modalStore.openModal(<LoginForm/>)} />
                    <Menu.Item position='right' content='Register' onClick={() => modalStore.openModal(<RegisterForm/>)} />
                    </>
                }
            </Container>
        </Menu>
    )
})