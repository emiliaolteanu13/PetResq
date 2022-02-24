import { observer } from "mobx-react-lite";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Grid, Header, Icon, Segment, Tab } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { UserFormValues } from "../../../app/models/user";




export default observer(function ProfileHeader() {
    const {postStore, userStore} = useStore();
    const {user} = userStore;
    const {postRegistry} = postStore;
    const {username} = useParams<{username: string}>()
    
   
    return (
        <Tab.Pane>
            <Header icon='user' content='Profile Details' />
            <Segment.Group>
                <Segment attached='top'>
                    <Grid>
                        <Grid.Column width={1}>
                            <Icon size='large' color='teal' name='address card outline' />
                        </Grid.Column>
                        <Grid.Column width={15}>
                            <p>User Name</p>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment attached='bottom'>
                    <Grid verticalAlign='middle'>
                        <Grid.Column width={1}>
                            <Icon name='envelope' size='large' color='teal' />
                        </Grid.Column>
                        <Grid.Column width={15}>
                            <span>User Email</span>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Segment.Group>
            <Button as={Link} to='#' color='orange' style={{padding: "7px", marginTop:"-6px"}} floated='right' content='Edit Profile' /> 
        </Tab.Pane>      
    )})