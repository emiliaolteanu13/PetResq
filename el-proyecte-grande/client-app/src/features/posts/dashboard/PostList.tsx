import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { useStore } from "../../../app/stores/store";
import PostListItem from "./PostListItem";


export default observer(function PostList() {

    const {postStore} = useStore();
    const {postsByDate} = postStore;

    

    return (
            <Fragment>
                {postsByDate.map(post => (
                    <PostListItem key={post.id}  post = {post}></PostListItem>
                ))}
            </Fragment>
    )
})