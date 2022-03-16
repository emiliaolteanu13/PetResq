import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { petTypeOptions } from "../../../app/common/options/petTypeOptions";
import { statusTypeOptions } from "../../../app/common/options/statusTypeOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Post } from "../../../app/models/post";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';

export default observer(function PostForm() {
    const history = useHistory();
    const {postStore, commonStore} = useStore();
    const { createPost, updatePost, loading, loadPost, loadingInitial } = postStore;
    const {id} = useParams<{id: string}>();

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
    
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({lat:0, lng: 0})
    const[post, setPost] = useState<Post>({
        id:'',
        title: '',
        description: '',
        date: null,
        location: '',
        userID: userId,
        username: username,
        petType: '',
        statusType: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('post title is a required field'),
        description: Yup.string().required('post description is a required field'),
        date: Yup.string().required('date is a required field').nullable(),
        petType: Yup.string().required('animal type is a required field'),
        statusType: Yup.string().required('post type is a required field')
    })

    useEffect(() => {
        if(id) loadPost(id).then(post => setPost(post!))
    }, [id, loadPost]);

    function handleFormSubmit(post: Post) {
        if(post.id.length === 0) {
            let newPost = {
                ...post,
                id: uuid()
            };
            newPost.location = address;
            createPost(newPost).then(() => history.push(`/posts/${newPost.id}`))
        } else {
            updatePost(post).then(() => history.push(`/posts/${post.id}`))
        }
    }
    const handleSelect = async (value: any) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0])
        setAddress(value);
        setCoordinates(latLng);

    }
    
    if(loadingInitial) return <LoadingComponent />
 
    
    
    return (
        <Segment clearing>
            <Header content='Post Details' sub color='teal' />
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={post} 
                onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput name='title' placeholder='Title' />
                    <MyTextArea rows={3} placeholder = 'Description' name='description' />
                    <MySelectInput name='petType' placeholder = "Animal Type" options={petTypeOptions} />
                    <MySelectInput name='statusType' placeholder = "Post type" options={statusTypeOptions} />
                    
                    <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                    {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                        <>
                    <MyTextInput name='location' {...getInputProps({  placeholder : 'Location', })} />
                    <div>
                        {loading && <div>loading...</div>}
                        
                        {suggestions.map((suggestion) => {
                            const style = {
                                backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                            }
                            return (
                                <div {...getSuggestionItemProps(suggestion, { style })} key={suggestion.id}>
                                    {suggestion.description}
                                </div>
                            )
                        })}
                    </div>
                    </>
                    )}
                    </PlacesAutocomplete>
                    <MyDateInput
                        placeholderText = 'Date' 
                        name='date'
                        dateFormat='MMMM d, yyyy'
                    />
                    <Button
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={loading} 
                        floated='right' 
                        positive type='submit' 
                        content='Submit'
                        style={{padding: "7px"}}/>
                    <Button as={Link} to='/posts' floated='right' type='button' style={{padding: "7px"}} content='Cancel'/>
                </Form>
                )}
            </Formik>
            
        </Segment>
    )
})