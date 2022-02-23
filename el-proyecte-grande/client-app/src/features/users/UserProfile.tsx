import { observer } from "mobx-react-lite";
import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import PostListItem from "../posts/dashboard/PostListItem";


export default observer(function UserProfile () {

    const {postStore, userStore} = useStore();
    const {user} = userStore;
    const { loadPosts, postRegistry} = postStore;
    
    useEffect(() => {
        if(postRegistry.size <= 1) loadPosts();
      }, [postRegistry.size, loadPosts])

    const postsByUser = Array.from(postRegistry.values()).filter(post =>
        post.username === user?.username)
    if (postStore.loadingInitial) return <LoadingComponent/>

    return (
        
        <Fragment>
            <h1>Profile</h1>
                {postsByUser.map(post => (
                    <PostListItem key={post.id}  post = {post}></PostListItem>
                ))}
        </Fragment>
    )
})