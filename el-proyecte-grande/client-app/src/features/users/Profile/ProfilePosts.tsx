import { observer } from "mobx-react-lite";
import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import PostListItem from "../../posts/dashboard/PostListItem";


export default observer(function UserProfile () {

    const {postStore} = useStore();
    const { loadPosts, postRegistry} = postStore;
    const {username} = useParams<{username: string}>();
    
    useEffect(() => {
        if(postRegistry.size <= 1) loadPosts();
      }, [postRegistry.size, loadPosts])

    const postsByUser = Array.from(postRegistry.values()).filter(post =>
        post.username === username)
    if (postStore.loadingInitial) return <LoadingComponent/>

    return (
        
        <Fragment>
            {postsByUser.map(post => (
                <PostListItem key={post.id}  post = {post}></PostListItem>
            ))}
        </Fragment>
    )
})