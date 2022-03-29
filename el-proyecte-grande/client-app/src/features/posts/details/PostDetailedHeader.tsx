import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Header, Item, Segment, Image } from 'semantic-ui-react'
import { Post } from "../../../app/models/post";
import { useStore } from '../../../app/stores/store';
import {format} from 'date-fns';
import { history } from '../../..';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Carousel } from 'react-carousel-minimal';
import agent from '../../../app/api/agent';


//??? mai facem ceva cu asta

const postImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'black'
};

interface Props {
    post: Post
}

export default observer(function PostDetailedHeader({ post }: Props) {
    const { userStore, postStore } = useStore();
    const { deletePost } = postStore;
    const { user } = userStore;
    const [target, setTarget] = useState('');
    const ImageFolder = agent.ImageFolder;
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
    function handlePostDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        
        setTarget(e.currentTarget.name);
        deletePost(id).then(() => history.push('/posts'));
    }
 
    ///carusel

    const data = [
        {
          image: `${ImageFolder}/${photosByPost[0].src}`
        },
        
   ];
   

      
      const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#00b5ad',
        top: '-30px'
      }



    ///
    

    return (
        <Segment.Group>
            {/* <Segment id='mainPic' basic attached='top' style={{ padding: '0' }}> */}
            {/* `data:image/png;base64,${photosByPost[0].content}` `/assets/dalmatian.jpg` */}
            {/* {photosByPost.length > 0 ? <Image src={`data:image/png;base64,${photosByPost[0].content}`} fluid />
                                     : <Image src={`/assets/dalmatian.jpg`} fluid /> } */}
                {/* <Segment style={postImageTextStyle} basic>
                    
                </Segment> */}
            {/* </Segment> */}
            <Segment>
                <Carousel
                data={data}
                automatic={false}
                width="850px"
                height="470px"
                radius="10px"
                slideNumber={true}
                slideNumberStyle={slideNumberStyle}
                dots={true}
                pauseIconColor="white"
                pauseIconSize="40px"
                slideBackgroundColor="white"
                slideImageFit="contain"
                thumbnails={true}
                thumbnailWidth="100px"
                style={{
                    textAlign: "center",
                    maxWidth: "850px",
                    maxHeight: "550px",
                    margin: "40px auto",
                }}
                />
            </Segment>
            <Segment clearing attached='bottom'>
            <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={post.title}
                                    style={{ color: 'black' }}
                                />
                                <p>{format(post.date!, 'dd MMM yyyy')}</p>
                               <p>
                               Posted by <Link to={`/profiles/${post.username}`}>{post.username}</Link>
                               </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                    {user?.username===post.username &&
                <Button as={Link} to={`/edit/${post.id}`} color='orange' style={{padding: "7px", marginTop:"-6px"}} floated='right'> 
                    Edit Post
                </Button>}
                {user?.username===post.username &&
                <Button color='red' onClick={(e) => handlePostDelete(e,post.id)} style={{padding: "7px", marginTop:"-15px"}} > Delete</Button>
}
            </Segment>
        </Segment.Group>
    )
})