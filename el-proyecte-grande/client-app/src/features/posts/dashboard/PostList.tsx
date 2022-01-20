import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";




// if any functionality does not work on a component we probably did not set it as an observer so it can observe the observables

export default observer(function PostList() {

    const {postStore} = useStore();
    const { deletePost, posts, loading } = postStore;
    const [target, setTarget] = useState('');

    function handlePostDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deletePost(id);
    }

    

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
                                    loading={loading && target === post.id} 
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
})