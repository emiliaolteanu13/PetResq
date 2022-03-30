import { observer } from "mobx-react-lite";
import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
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
import { Button, Header, Icon, Segment } from "semantic-ui-react";


export default observer(function PostForm() {
    const history = useHistory();
    const {postStore, commonStore, petPhotoStore} = useStore();
    const { createPost, updatePost, loading, loadPost, loadingInitial } = postStore;
    const {createPetPhoto} = petPhotoStore;
    const {id} = useParams<{id: string}>();
    var fileObj : any[] = [];
    const fileInputEl = useRef(null);

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

    const uploadFiles = (postId : string, files: any[]) => {
        let uploadedFiles = Array.from(files)
        uploadedFiles.forEach(async file => {
            const petPhoto = new FormData();
            
            petPhoto.append(
                "content",
                file
            )
            petPhoto.append(
                "postId",
                postId
            )
            await createPetPhoto(petPhoto);
        })
    }

    function handleFormSubmit( post : Post, e: any) {
        if(post.id.length === 0) {
            let newPost = {
                ...post,
                id: uuid()
            };
            newPost.location = address;
            
            
            uploadFiles(newPost.id, fileInputEl.current.files);
            createPost(newPost).then(() => history.push(`/posts/${newPost.id}`))
        } else {
            uploadFiles(post.id, fileInputEl.current.files);
            updatePost(post).then(() => history.push(`/posts/${post.id}`))
        }
    }
    const handleSelect = async (value: any) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0])
        setAddress(value);
        setCoordinates(latLng);

    }

    const [pics, setPics] = useState([{ alt: "", src: "" }]);

    const toBase64 = (file : any) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const fileHandler = async (event: any) => {
        
        event.preventDefault();

        const files = event.currentTarget.files;

        let out : any [] = [];
        for (let index = 0; index < files.length; index++) {
            
            fileObj.push(files.item(index))
            out.push({
                alt: "",
                src: await toBase64(files.item(index)),
            });
        }
        setPics(out);

    }; 
    
    if(loadingInitial) return <LoadingComponent />
 
    
    
    return (
        <Segment clearing>
            <Header content='Post Details' sub color='teal' />
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={post} 
                onSubmit={( values, e) => handleFormSubmit(values, e)}>
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
               
                   
                <label> Choose a file </label>
                <Button as="label" htmlFor="file" type="button" animated="fade">
                <Button.Content visible>
                    <Icon name="file" />
                </Button.Content>
                </Button>
                    <input accept="image/*" name="files" type="file" id="file" ref={fileInputEl} onChange={fileHandler} multiple hidden />
                    
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap:'1em'}}>
                        {pics[0].src !== "" && pics.map((file, i) => (<img key={i} className="preview" src={file.src} alt={file.alt} style={{width:'100%', height:'100%', paddingBottom:'1em'}} />

                        ))}
                    
                                                                        
                </div>
                
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