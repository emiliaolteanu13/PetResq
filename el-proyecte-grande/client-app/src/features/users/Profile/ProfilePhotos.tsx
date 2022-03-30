import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Card, Header, Image, Tab } from "semantic-ui-react";

export default observer(function ProfilePhotos() {
    return (
        <Tab.Pane>
            <Header icon='image' content='Photos' />
            <Card.Group itemsPerRow={5}>
                <Card>
                    <Image src={'/assets/user.png'} />
                </Card>
                
            </Card.Group>
            <Button as={Link} to='#' color='blue' style={{padding: "7px", marginTop:"-6px"}} floated='right' content='Add Photo' />
            <Button as={Link} to='#' color='orange' style={{padding: "7px", marginTop:"-6px"}} floated='right' content='Set as main' />  
        </Tab.Pane>
    )
})