import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Post } from "../../../app/models/post";
import { useStore } from "../../../app/stores/store";



interface Props {
    posts: Post[];
    deletePost: (id: string)=> void;
    submitting: boolean;
}

export default function PostList({posts, deletePost, submitting}:Props) {
    const [target, setTarget] = useState('');

    function handlePostDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deletePost(id);
    }

    const {postStore} = useStore();

    return (
        <Segment>
            <Item.Group divided>
                {posts.map(post => (
                    <Item key={post.id}>
                        <Item.Content>
                            <Item.Header as='a'>{post.title}</Item.Header>
                            <Item.Meta>{post.date}</Item.Meta>
                            <Item.Description>
                                <div>{post.description}</div>
                                <div>{post.location}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={()=> postStore.selectPost(post.id)} floated='right' content='View' color='blue'/>
                                <Button 
                                    name={post.id}
                                    loading={submitting && target === post.id} 
                                    onClick={(e)=> handlePostDelete(e, post.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red'/>
                                <Label basic content={post.petType} />
                                <Label basic content={post.statusType} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}