import React from "react";
import { Tab } from "semantic-ui-react";
import ProfilePosts from "./ProfilePosts";

export default function ProfileContent() {
    const panes = [
        {menuItem: 'About', render: () => <Tab.Pane>About Content</Tab.Pane>},
        {menuItem: 'Posts', render: () => <ProfilePosts />},
        {menuItem: 'Photos', render: () => <Tab.Pane>Posts Content</Tab.Pane>}

    ];

    return (
        <Tab
            menu={{fluid: true, vertical: true}}
            menuPosition='right'
            panes={panes}
        />
    )
}
