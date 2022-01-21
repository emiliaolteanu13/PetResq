import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";


export default observer(function PostDetails () {

    const {postStore} = useStore();
    const { selectedPost: post, loadPost, loadingInitial} = postStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadPost(id);
    }, [id, loadPost]);

    if(loadingInitial || !post) return <LoadingComponent />;

    return (
        <Card fluid>
            {/*<Image src={`/assets/${petPhoto.postId}.jpg`} ceva de genul, si sa adaugam interfata sus />*/}
            <Image src="/assets/dalmatian.jpg" />
            <Card.Content>
                <Card.Header>{post.title}</Card.Header>
                <Card.Meta>
                    <span>{post.date}</span>
                </Card.Meta>
                <Card.Description>
                    {post.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Button.Group widths='2'>
                <Button as={Link} to={`/manage/${post.id}`} basic color='blue' content='Edit' />
                <Button as={Link} to='/posts' basic color='grey' content='Cancel' />
            </Button.Group>
            </Card.Content>
        </Card>
    )
})