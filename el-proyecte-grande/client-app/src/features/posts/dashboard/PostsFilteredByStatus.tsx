import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import PostFilters from './PostFilters';
import PostListItem from './PostListItem';


export default function PostsFilteredByStatus(){
    const {postStore} = useStore();
    const { loadPosts, postRegistry} = postStore;
    let {status} = useParams<{status: string}>();
    if(status == 'for-adoption'){
        status = 'for adoption'
    }
    useEffect(() => {
        if(postRegistry.size <= 1) loadPosts();
      }, [postRegistry.size, loadPosts])
      if (postStore.loadingInitial) return <LoadingComponent/>
    const posts = Array.from(postRegistry.values()).filter(post =>
        post.statusType.toLowerCase() === status.toLowerCase())
        return (
            <Grid>
                <Grid.Column width="10">
                    <Fragment>
                        {posts.map(post => (
                            <PostListItem key={post.id}  post = {post}></PostListItem>
                        ))}
                    </Fragment>
                </Grid.Column>
                <Grid.Column width="6">
                <PostFilters />
            </Grid.Column>
            </Grid>
            
        )
}