import { observer } from "mobx-react-lite";
import React from "react";
import { Tab } from "semantic-ui-react";
import ProfileDetails from "./ProfileDetails";
import ProfilePhotos from "./ProfilePhotos";
import ProfilePosts from "./ProfilePosts";



export default observer(function ProfileContent() {
    const panes = [
        {menuItem: 'About', render: () => <ProfileDetails />},
        {menuItem: 'Posts', render: () => <ProfilePosts />},
        {menuItem: 'Photos', render: () => <ProfilePhotos />}

    ];

    return (
        <Tab
            menu={{fluid: true, vertical: true}}
            menuPosition='right'
            panes={panes}
        />
    )
})
