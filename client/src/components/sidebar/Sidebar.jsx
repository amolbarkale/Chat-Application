import React from 'react'
import "./sidebar.css";
import { Users } from '../../dummyData';
import {Event,School,RssFeed,Group, WorkOutline, HelpOutline, Bookmark, PlayCircleFilledOutlined, Chat} from "@material-ui/icons"
import Closefrined from '../Friends/Closefrined';
export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarwrapper">
                <ul className="sidebarlist">
                    <li className="sidebarlistItm">
                        <RssFeed className="sidebarIcon" />
                        <span className="sidebarlistitmText">
                            Feed
                        </span>
                    </li>
                    
                     <li className="sidebarlistItm">
                        <Chat className="sidebarIcon" />
                        <span className="sidebarlistitmText">
                            Chats
                        </span>
                    </li>
                    <li className="sidebarlistItm">
                        <PlayCircleFilledOutlined className="sidebarIcon" />
                        <span className="sidebarlistitmText">
                            Videos
                        </span>
                    </li>
                    <li className="sidebarlistItm">
                        <Group className="sidebarIcon" />
                        <span className="sidebarlistitmText">
                            Groups
                        </span>
                    </li>
                    <li className="sidebarlistItm">
                        <Bookmark className="sidebarIcon" />
                        <span className="sidebarlistitmText">
                            Bookmark
                        </span>
                    </li>
                    <li className="sidebarlistItm">
                        <HelpOutline className="sidebarIcon" />
                        <span className="sidebarlistitmText">
                            Questions
                        </span>
                    </li>
                    <li className="sidebarlistItm">
                        <WorkOutline className="sidebarIcon" />
                        <span className="sidebarlistitmText">
                            Jobs
                        </span>
                    </li>
                    <li className="sidebarlistItm">
                        <Event className="sidebarIcon" />
                        <span className="sidebarlistitmText">
                            Event
                        </span>
                    </li>
                      <li className="sidebarlistItm">
                        <School className="sidebarIcon" />
                        <span className="sidebarlistitmText">
                            Courses
                        </span>
                    </li>
                </ul>
                <button className="sidebarbtn">Show more</button>
                <hr className="sidebarhr" />
                <ul className="sidebarfriendlist">
                    {
                        Users.map((u) => (<Closefrined key={ u.id} user={u}/>))
                    }
                   </ul>
            </div>
            
        </div>
    )
}
