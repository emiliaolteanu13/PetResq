import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Grid, Header, Icon, Segment, Tab } from "semantic-ui-react";




export default observer(function ProfileHeader() {
    
   
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