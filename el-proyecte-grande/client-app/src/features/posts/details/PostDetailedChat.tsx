import { observer } from 'mobx-react-lite'
import React, { useEffect} from 'react'
import {Segment, Header, Comment, Form, Button} from 'semantic-ui-react'
import { Post } from '../../../app/models/post'
import { useStore } from '../../../app/stores/store'
import { useHistory } from 'react-router-dom'
import CommentForm from '../form/CommentForm'

interface Props {
    post: Post
}

export default observer(function PostDetailedChat({ post }: Props) {
    const {commentStore, userStore} = useStore();
    const { loadComments, commentRegistry } = commentStore;
    useEffect(() => {
        if(commentRegistry.size <= 1) loadComments();
      }, [commentRegistry.size, loadComments])
   
    const commentsByPost = Array.from(commentRegistry.values()).filter(comment => 
        comment.postId === post.id
    );
    
    
    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{border: 'none'}}
            >
                <Header>Chat about this post</Header>
            </Segment>
            <Segment attached>
                <Comment.Group>
                    {commentsByPost.map((comment) => (
                        <Comment>
                            <Comment.Avatar src='/assets/logoDefault.png'/>
                        <Comment.Content>
                            <Comment.Author as='a'>{comment.username}</Comment.Author>
                            <Comment.Metadata>
                                {/* <div>{comment.date}</div> */}
                            </Comment.Metadata>
                            <Comment.Text>{comment.text}</Comment.Text>
                            
                        </Comment.Content>
                        </Comment>
                    ))}
                    
                    
                </Comment.Group>
                {userStore.isLoggedIn &&
                <CommentForm post={post}/>
                }
            </Segment>
        </>
    )
})