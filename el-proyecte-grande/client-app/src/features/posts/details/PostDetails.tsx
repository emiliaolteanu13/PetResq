import React from "react";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import { Post } from "../../../app/layout/model/post";

interface Props {
    post: Post
}

export default function PostDetails ({ post }: Props) {
    return (
        <Card fluid>
            {/*<Image src={`/assets/${petPhoto.postId}.jpg`} ceva de genul, si sa adaugam interfata sus />*/}
            <Image src="/assets/dalmatian.jpg" />
            <Card.Content>
                <Card.Header>{post.title}</Card.Header>
                <Card.Meta>
                    <span>data postarii</span> {/*{post.date}*/}
                </Card.Meta>
                <Card.Description>
                    {post.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Button.Group widths='2'>
                <Button basic color='blue' content='Edit' />
                <Button basic color='grey' content='Cancel' />
            </Button.Group>
            </Card.Content>
        </Card>
    )
}