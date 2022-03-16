import React from "react";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import { Header, Menu } from "semantic-ui-react";

export default function PostFilters() {
    
    return (
        <>
            <Menu vertical size='large' style={{width: '100%'}}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item content='All Posts' as={Link} to='/posts'/>
                <Menu.Item content='Found' as={Link} to='/filter/found' />
                <Menu.Item content='Lost' as={Link} to='/filter/lost'/>
                <Menu.Item content='For Adoption' as={Link} to='/filter/for-adoption'/>
            </Menu>
            <Header />
            <Calendar />
        </>
        
    )
}