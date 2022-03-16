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
    const {loadPosts, postRegistry, loadPostsByStatus, loadPostsByPet} = postStore;
    let {status} = useParams<{status: string}>();
    let {pet} = useParams<{pet: string}>();
 
    
    useEffect(() => {
        if(status){
            loadPostsByStatus(status)
        }
        else if(pet){
            loadPostsByPet(pet)
        }
        else if(!status && !pet) {
            loadPosts();
    }
    }, [loadPosts, status, pet])

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