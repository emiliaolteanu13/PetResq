import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Post } from "../../../app/layout/model/post";




interface Props {
    posts: Post[];
}

export default function PostList({posts}:Props) {
    console.log(posts)
    return (
        <Segment>
            <Item.Group divided>
                {posts.map(post => (
                    <Item key={post.id}>
                        <Item.Content>
                            <Item.Header as='a'>{post.title}</Item.Header>
                            {/*<Item.Meta>{post.date}</Item.Meta>* for the date of the post*/}
                            <Item.Description>
                                <div>{post.description}</div>
                                <div>{post.location}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue'/>
                                <Label basic content={post.petType} />
                                <Label basic content={post.statusType} /> {/*de aflat cum facem sa afisam tagul ca string din enum*/}
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}