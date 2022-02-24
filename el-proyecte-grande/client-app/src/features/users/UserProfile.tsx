import { observer } from "mobx-react-lite";
import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Segment } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import PostListItem from "../posts/dashboard/PostListItem";
import ProfileContent from "./Profile/ProfileContent";
import ProfileHeader from "./Profile/ProfileHeader";


export default observer(function UserProfile () {

    

    return (
        
        <Fragment>
            <Grid >
                <Grid.Column  width={16} >
                    <ProfileHeader  />
                    <ProfileContent />
                </Grid.Column>
            </Grid>
    
        </Fragment>
    )
})