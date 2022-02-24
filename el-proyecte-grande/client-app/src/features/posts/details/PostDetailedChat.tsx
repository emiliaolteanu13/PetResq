import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import {Segment, Header, Comment, Form, Button} from 'semantic-ui-react'
import { Post } from '../../../app/models/post'
import { v4 as uuid } from 'uuid'
import { Comment as comm } from '../../../app/models/comment'
import { useStore } from '../../../app/stores/store'
import { Link, useHistory } from 'react-router-dom'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { Formik } from 'formik'
import MyTextArea from '../../../app/common/form/MyTextArea'

interface Props {
    post: Post
}

export default observer(function ActivityDetailedChat({ post }: Props) {
    const {commentStore, commonStore} = useStore();
    const history = useHistory();
    const { loadComments, commentRegistry, createComment, loadingInitial} = commentStore;
    useEffect(() => {
        if(commentRegistry.size <= 1) loadComments();
      }, [commentRegistry.size, loadComments])
    function parseJwt (token : any) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };
    const token = parseJwt(commonStore.token);
    const userId = token.nameid;
    const username = token.unique_name;
    const [comment, setComment] = useState({
        id: '',
        text: '',
        userId: userId,
        username: username,
        postId: post.id,
        //date: null
    });
    const commentsByPost = Array.from(commentRegistry.values()).filter(comment => 
        comment.postId === post.id
    );
    console.log(commentsByPost);
    console.log(Array.from(commentRegistry.values()))
    function handleFormSubmit(comment: comm) {
        if(comment.id.length === 0) {
            let newComment = {
                ...comment,
                id: uuid()
            };
            const now = new Date();
            //newComment.date = now;
            createComment(newComment).then(() => history.push(`/posts/${post.id}`))
        } 
        // else {
        //     updatePost(post).then(() => history.push(`/posts/${post.id}`))
        // }
    }

    if(loadingInitial) return <LoadingComponent />
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
                    
                    <Formik                
                    enableReinitialize 
                initialValues={comment} 
                onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    
                    <MyTextArea rows={3} placeholder = 'text' name='text' />
                    
                    
                    <Button
                    
                        floated='right' 
                        positive type='submit' 
                        content='Submit'/>
                    <Button as={Link} to='/posts' floated='right' type='button' content='Cancel'/>
                </Form>
                )}
            </Formik>
                </Comment.Group>
            </Segment>
        </>
    )
})