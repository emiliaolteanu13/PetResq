import React from 'react'
import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Post } from '../../../app/models/post'

interface Props {
    post: Post
}

export default observer(function ActivityDetailedSidebar ({ post }: Props) {
    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                Contact info
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    <Item style={{ position: 'relative' }}>
                        <Label
                            style={{ position: 'absolute' }}
                            color='orange'
                            ribbon='right'
                        >
                            Author
                        </Label>
                        <Image size='tiny' src={'/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3'>
                                <Link to={`/profiles/${post.username}`}>{post.username}</Link>
                            </Item.Header>
                        </Item.Content>
                        {/*de adaugat si alte campuri */}
                    </Item>
                </List>
            </Segment>
        </>
    )
})