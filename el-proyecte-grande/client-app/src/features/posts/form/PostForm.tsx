import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';


export default observer(function PostForm() {
    const history = useHistory();
    const {postStore} = useStore();
    const { createPost, updatePost, loading, loadPost, loadingInitial } = postStore;
    const {id} = useParams<{id: string}>();

    const[post, setPost] = useState({
        id:'',
        title: '',
        description: '',
        date: '',
        location: '',
        userID: '84b1ffb1-f1a1-44c4-a8b7-016610c6a135',
        petType: '',
        statusType: ''
    });

    useEffect(() => {
        if(id) loadPost(id).then(post => setPost(post!))
    }, [id, loadPost]);

    const petType = [
        {key: 1, value: 1, text: "CAT"},
        {key: 2, value: 2, text: "DOG"},
        {key: 3, value: 3, text: "ALPACA"},
        {key: 4, value: 4, text: "OTHER"}];

    const statusType = [
        {key: 1, value: 1, text: "LOST"},
        {key: 2, value: 2, text: "FOUND"},
        {key: 3, value: 3, text: "FOR ADOPTION"}];
    

    function handleSubmit() {
        if(post.id.length === 0) {
            let newPost = {
                ...post,
                id: uuid()
            };
            createPost(newPost).then(() => history.push(`/posts/${newPost.id}`))
        } else {
            updatePost(post).then(() => history.push(`/posts/${post.id}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const{name, value} = event.target;
        setPost({...post, [name]: value})
    }

    const handleDropDownSelectPet = (event: any, data: any) => {
        const name = 'petType';
        const value = petType[data.value-1].text;
        setPost({...post, [name]: value})
       };

    const handleDropDownSelectStatus = (event: any, data: any) => {
        const name = 'statusType';
        const value = statusType[data.value-1].text;
        setPost({...post, [name]: value})
        };

    if(loadingInitial) return <LoadingComponent content='Loading post...' />
        
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder = 'Title' value={post.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder = 'Description' value={post.description} name='description' onChange={handleInputChange}/>
                <Form.Select placeholder = {post.petType?post.petType:"Animal Type"} options={petType} onChange={handleDropDownSelectPet}/>
                <Form.Select placeholder = {post.statusType?post.statusType:"Post type"} options={statusType} onChange={handleDropDownSelectStatus}/>
                <Form.Input placeholder = 'Location' value={post.location} name='location' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder = 'Date' value={post.date} name='date' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                <Button as={Link} to='/posts' floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
})