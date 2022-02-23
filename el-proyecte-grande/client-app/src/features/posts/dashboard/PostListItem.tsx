import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { Post } from '../../../app/models/post';
import { useStore } from '../../../app/stores/store';
import {format} from 'date-fns';

interface Props{
    post: Post
}

export default function PostListItem({post}: Props) {

    const {postStore} = useStore();
    const { deletePost, loading } = postStore;
    const [target, setTarget] = useState('');

    function handlePostDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deletePost(id);
    }
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/logo.png'/>

                        <Item.Content>
                            <Item.Header as ={Link} to={`/posts/${post.id}`}>
                                {post.title}
                            </Item.Header>
                            
                                {post.username &&
                                <Item.Description>
                                Posted by {post.username}
                                </Item.Description>
                                }
                                
                            
                        </Item.Content>
                    </Item>

                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' />{format(post.date!, 'dd MMM yyyy')}
                    <Icon name='marker'/>{post.location}
                    
                </span>
            </Segment>
            <Segment clearing>
                <span>
                    {post.description}
                </span>
                <Button as={Link} to={`posts/${post.id}`} color='teal' floated='right' content='View'/>
            </Segment>
            <Segment>
                <span>
                <p>Pet:</p>
                <Button as={Link} to={`/pet/${post.petType}`} color='grey' floated='left' style={{padding: "7px", marginTop:"-30px", marginLeft: "40px"}}  content={post.petType.toLowerCase()}/>
                    
                </span>
            </Segment>
        </Segment.Group>
    )
}