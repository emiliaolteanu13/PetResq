import { observer } from "mobx-react-lite";
import { Fragment} from "react";
import { Grid } from "semantic-ui-react";
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