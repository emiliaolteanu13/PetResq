import { observer } from "mobx-react-lite";
import { Card, Header, Image, Tab } from "semantic-ui-react";

export default observer(function ProfilePhotos() {
    return (
        <Tab.Pane>
            <Header icon='image' content='Photos' />
            <Card.Group itemsPerRow={5}>
                <Card>
                    <Image src={'/assets/user.png'} />
                </Card>
                <Card>
                    <Image src={'/assets/user.png'} />
                </Card>
                <Card>
                    <Image src={'/assets/user.png'} />
                </Card>
            </Card.Group>
        </Tab.Pane>
    )
})