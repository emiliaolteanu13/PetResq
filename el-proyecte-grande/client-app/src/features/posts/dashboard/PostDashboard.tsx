import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Post } from "../../../app/layout/model/post";
import PostList from "./PostList";

interface Props {
    posts: Post[];
}

export default function PostDashboard({posts}: Props) {
    return (
        <Grid>
            <Grid.Column width="10">
                <PostList posts={posts}/>
            </Grid.Column>
        </Grid>
    )
}