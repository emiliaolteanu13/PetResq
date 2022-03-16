import { observer } from "mobx-react-lite";
import { Link, useHistory } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid'
import { Comment as comm } from '../../../app/models/comment'
import { Post } from "../../../app/models/post";
import { Formik } from "formik";
import { Button, Form } from "semantic-ui-react";
import MyTextArea from "../../../app/common/form/MyTextArea";

interface Props {
    post: Post
}

export default observer(function CommentForm({ post }: Props) {
    const {commentStore, commonStore} = useStore();
    const history = useHistory();
    const { createComment, loading} = commentStore;

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
    const comment = {
        id: '',
        text: '',
        userId: userId,
        username: username,
        postId: post.id,
        //date: null
    };
    // const commentsByPost = Array.from(commentRegistry.values()).filter(comment => 
    //     comment.postId === post.id
    // );
    
    function handleFormSubmit(comment: comm) {
        if(comment.id.length === 0) {
            let newComment = {
                ...comment,
                id: uuid()
            };
            // const now = new Date();
            //newComment.date = now;
            createComment(newComment).then(() => history.push(`/posts/${post.id}`))
        } 
        // else {
        //     updatePost(post).then(() => history.push(`/posts/${post.id}`))
        // }
    }
    return (
        <Formik               
                    enableReinitialize 
                initialValues={comment} 
                onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit,isValid, isSubmitting, dirty}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    
                    <MyTextArea rows={3} placeholder = 'text' name='text' />
                    
                    
                    <Button
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={loading}
                        floated='right' 
                        style={{padding: "7px", marginTop:"-14px"}}
                        positive type='submit' 
                        content='Submit'/>
                    <Button as={Link} to='/posts' floated='right' style={{padding: "7px", marginTop:"-14px"}}    content='Cancel'/>
                </Form>
                )}
            </Formik>
    )
})