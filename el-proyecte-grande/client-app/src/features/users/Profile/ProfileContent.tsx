import { observer } from "mobx-react-lite";
import React from "react";
import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import ProfilePosts from "./ProfilePosts";

export default observer(function ProfileContent() {
    const panes = [
        {menuItem: 'About', render: () => <Tab.Pane>About Content</Tab.Pane>},
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
