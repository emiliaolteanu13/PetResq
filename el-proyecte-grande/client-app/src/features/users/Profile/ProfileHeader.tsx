import React from "react";
import { useParams } from "react-router-dom";
import { Grid,  Header, Item, Segment, Statistic } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default function ProfileHeader() {
    const {postStore, userStore} = useStore();
    const {user} = userStore;
    const {postRegistry} = postStore;
    const {username} = useParams<{username: string}>()
    
    const postsByUser = Array.from(postRegistry.values()).filter(post =>
        post.username === username)
    return (
        <Segment>
            <Grid verticalAlign='middle' centered>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size='small' src={'/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1' content={`${user?.displayName}`} />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={3}>
                    <Statistic.Group widths={1}>
                        <Statistic label='Posts' value={`${postsByUser.length}`} />
                    </Statistic.Group>
                </Grid.Column>
            </Grid>
        </Segment>
    )
}