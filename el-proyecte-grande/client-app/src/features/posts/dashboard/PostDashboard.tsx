import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import PostFilters from "./PostFilters";
import PostList from "./PostList";


export default observer (function PostDashboard() {

    const {postStore} = useStore();
    const {loadPosts, postRegistry, loadPostsByStatus} = postStore;
    let {filter} = useParams<{filter: string}>();
 
    
    useEffect(() => {
        if(filter){
            loadPostsByStatus(filter)
        }
        else if(!filter) {
            loadPosts();
    }
    }, [loadPosts, filter])

    useEffect(() => {
        
    })
  
  
    if (postStore.loadingInitial) return <LoadingComponent/>

    return (
        <Grid>
            <Grid.Column width="10">
                <PostList />
            </Grid.Column>
            <Grid.Column width="6">
                <PostFilters />
            </Grid.Column>
        </Grid>
    )
})