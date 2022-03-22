import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Post } from '../../../app/models/post';
import { useStore } from '../../../app/stores/store';
import {format} from 'date-fns';
import LoadingComponent from '../../../app/layout/LoadingComponent';

interface Props{
    post: Post
}

export default function PostListItem({post}: Props) {

    const {petPhotoStore} = useStore();
    const { loadPetPhotos, petPhotoRegistry} = petPhotoStore;
    useEffect(()=>{
        if(petPhotoRegistry.size <= 1) loadPetPhotos();
        
    }, [petPhotoRegistry.size, loadPetPhotos])
    const photosByPost = Array.from(petPhotoRegistry.values()).filter(photo =>
        photo.postId === post.id
    )

    console.log(Array.from(petPhotoRegistry.values()))
    if(petPhotoStore.loadingInitial) return <LoadingComponent/>
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        {photosByPost.length > 0 && 
                        <Item.Image size='tiny' circular src={`data:image/png;base64,${photosByPost[0].content}`}/>
                        }
                        

                        <Item.Content>
                            <Item.Header as ={Link} to={`/posts/${post.id}`}>
                                {post.title}
                            </Item.Header>
                            
                                {post.username &&
                                <Item.Description>
                                Posted by <Link to={`/profiles/${post.username}`}>{post.username}</Link>
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
                
            </Segment>
            <Segment>
                <span>
                <p></p>
                <Button as={Link} to={`/pet/${post.petType}`} color='grey' floated='left' style={{padding: "7px", marginTop:"-20px"}}  content={post.petType.toLowerCase()}/>
                <Button as={Link} to={`/posts/${post.id}`} color='teal' floated='right' style={{padding: "7px", marginTop:"-20px", marginLeft: "10px"}} content='View'/>  
                </span>
            </Segment>
        </Segment.Group>
    )
}