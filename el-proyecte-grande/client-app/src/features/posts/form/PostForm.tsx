import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Post } from "../../../app/layout/model/post";

interface Props {
    post: Post | undefined;
    closeForm: () => void;
    createOrEdit: (post: Post) => void;
}

export default function PostForm({post: selectedPost, closeForm, createOrEdit}: Props) {

    const initialState = selectedPost ?? {
        id:'',
        title: '',
        description: '',
        date: '',
        location: '',
        userID: '',
        petType: '',
        statusType: ''
    }

    const[post, setPost] = useState(initialState);

    function handleSubmit() {
        createOrEdit(post);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const{name, value} = event.target;
        setPost({...post, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder = 'Title' value={post.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder = 'Description' value={post.description} name='description' onChange={handleInputChange}/>
                {/*<Form.Select placeholder = "Animal type" options={post.petType}/>   de vazut maine exact cum facem cu options*/}
                <Form.Input placeholder = 'Location' value={post.location} name='location' onChange={handleInputChange}/>
                <Form.Input placeholder = 'Date' value={post.date} name='date' onChange={handleInputChange}/>
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}