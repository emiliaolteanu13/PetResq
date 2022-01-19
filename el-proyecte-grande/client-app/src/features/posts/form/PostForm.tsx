import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Post } from "../../../app/models/post";

interface Props {
    post: Post | undefined;
    closeForm: () => void;
    createOrEdit: (post: Post) => void;
    submitting: boolean;
}

export default function PostForm({post: selectedPost, closeForm, createOrEdit, submitting}: Props) {

    const petType = [
        {key: 1, value: 1, text: "CAT"},
        {key: 2, value: 2, text: "DOG"},
        {key: 3, value: 3, text: "ALPACA"},
        {key: 4, value: 4, text: "OTHER"}];

    const statusType = [
        {key: 1, value: 1, text: "LOST"},
        {key: 2, value: 2, text: "FOUND"},
        {key: 3, value: 3, text: "FOR ADOPTION"}];

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

    /*function handleSelect(event : ChangeEvent<HTMLSelectElement>) {
        const{name, value} = event.target;
        setPost({...post, [name]:value})
    }*/

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder = 'Title' value={post.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder = 'Description' value={post.description} name='description' onChange={handleInputChange}/>
                <Form.Select placeholder = "Animal type" options={petType} />
                <Form.Select placeholder = "Post type" options={statusType} />
                <Form.Input placeholder = 'Location' value={post.location} name='location' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder = 'Date' value={post.date} name='date' onChange={handleInputChange}/>
                <Button loading={submitting} floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}